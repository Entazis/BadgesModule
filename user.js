/**
 * This file contains the User model and the related schemas for it
 */
/* ---------- Module requirements */
const config = require('@codeberry/nodejs').config;
const mongoose = require('mongoose');
const curriculumRepository = require('../curriculum-repository/repository.js');
const i18nHelper = require('../i18n/i18n');
const commonSchema = require('../site/models/commonSchema');
const badges = require('../badge/badgeRepository');
const slackSender = require('../services/slack-sender');

/* Logger */
const logger = require('@codeberry/nodejs').logger;

/* ---------- JSDOC definitions */
/* ---------- Module functions */
/**
 * @typedef {Object} User
 * -----------------------------------------------------------------------------
 * @property {Boolean} isAdmin
 * @property {slackAuthSchema} slack
 * @property {localAuthSchema} local
 * @property {facebookAuthSchema} facebook
 * @property {googleAuthSchema} google
 * @property {githubAuthSchema} github
 * @property {Array} badges
 * @property {Object<string, Object<string, {created_at: Date, value: string, timeSpentOnAssignmentInSeconds: int, isSkipped:boolean}{}>>} submissions
 * @property {orangePersonalDataSchema} personalData
 * @property {Boolean} personalDataConfirmed
 * @property {Boolean} signupAgreement
 * @property {projectProgressSchema} projectProgress
 * @property {conceptProgressSchema} conceptProgress
 * @property {codesSchema} codes
 * @property {utmCampaignSchema} campaign
 * @property {localeSchema} locale
 * @property {subscriptionSchema} subscription2
 * @property {levelProgressSchema} levelProgress
 * @property {userBadgeRelatedEventsSchema} badgeRelatedEvents
 * @property {curriculumPermissionsSchema} curriculumPermissions
 * @property {orangeNavigationSchema} navigation
 * @property {referralDataSchema} referral
 * @property {String} resetPasswordToken
 * @property {Date} resetPasswordExpires
 * @property {Array.<surveySubmissionSchema>} surveySubmissions
 * @property {Boolean} isEmailConfirmed
 * @property {String} emailToken
 * -----------------------------------------------------------------------------
 * @property {function} generateHash
 * @property {function} name
 * @property {function} hungarianName
 * @property {function} initials
 * @property {function} hungarianInitials
 * @property {function} getPrimaryEmail
 * @property {function} firstName
 * @property {function} lastName
 * @property {function} validPassword
 * @property {function} getFullLocaleCodeOrDefault
 * @property {function} getLatestSubmission
 * @property {function} saveSubmission
 * @property {function} setProjectProgress
 * @property {function} setConceptProgress
 * @property {function} addBadgeId
 * @property {function} saveConfirmData
 * @property {function} saveSurveyData
 * @property {function} getTotalSubmissionCount
 * @property {function} updateProgressMapForProject
 * @property {function} updateProgressMapForConcept
 * @property {function} recalculateAllProjectProgress
 * @property {function} recalculateAllConceptProgress
 * -----------------------------------------------------------------------------
 */
const userSchema = mongoose.Schema({
    isAdmin: {type: Boolean, default: false},
    slack: commonSchema.slackAuthSchema,
    local: commonSchema.localAuthSchema,
    facebook: commonSchema.facebookAuthSchema,
    google: commonSchema.googleAuthSchema,
    github: commonSchema.githubAuthSchema,
    badges: {type: Array, default: []},
    submissions: {type: Object, default: {}},
    personalData: commonSchema.orangePersonalDataSchema,
    personalDataConfirmed: {type: Boolean, default: false},
    signupAgreement: {type: Boolean, default: false},
    projectProgress: commonSchema.projectProgressSchema,
    conceptProgress: commonSchema.conceptProgressSchema,
    codes: commonSchema.codesSchema,
    campaign: commonSchema.utmCampaignSchema,
    locale: commonSchema.localeSchema,
    subscription2: commonSchema.subscriptionSchema,
    levelProgress: commonSchema.levelProgressSchema,
    badgeRelatedEvents: commonSchema.userBadgeRelatedEventsSchema,
    curriculumPermissions: commonSchema.curriculumPermissionsSchema,
    navigation: commonSchema.orangeNavigationSchema,
    referral: commonSchema.referralDataSchema,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    surveySubmissions: [commonSchema.surveySubmissionSchema],
    isEmailConfirmed: { type: Boolean, default: false },
    emailToken: String
}, { minimize: false });

/* Disable VersionKey */
userSchema.set('versionKey', false);

/**
 * @returns {string} name The user name
 */
userSchema.methods.name = function() {
    /* Check for hungarian name */
    if (this.locale) {
        if (this.locale.fullLocaleCode === 'hu-HU') {
            return this.hungarianName();
        }
    }

    /* Return default name */
    return this.personalData.givenName + ' ' + this.personalData.familyName;
};

userSchema.methods.hungarianName = function() {
    return this.personalData.familyName + ' ' + this.personalData.givenName;
};

/**
 * @returns {string} name The user name
 */
userSchema.methods.initials = function() {
    /* Check for hungarian name */
    if (this.locale) {
        if (this.locale.fullLocaleCode === 'hu-HU') {
            return this.hungarianInitials();
        }
    }

    /* Return default name */
    return (this.personalData.givenName || ' ').substring(0, 1).toUpperCase() + (this.personalData.familyName || ' ').substring(0, 1).toUpperCase();
};

userSchema.methods.hungarianInitials = function() {
    return (this.personalData.familyName || ' ').substring(0, 1).toUpperCase() + (this.personalData.givenName || ' ').substring(0, 1).toUpperCase();
};

/**
 * @returns {string|null} email The primary email or null
 */
userSchema.methods.getPrimaryEmail = function() {
    return (this.personalData.email) ? this.personalData.email : null;
};

/**
 * @returns {string|null} firstName The first name of the user
 */
userSchema.methods.firstName = function() {
    return (this.personalData.givenName) ? this.personalData.givenName : null;
};

/**
 * @returns {string|null} lastName The last name of the user
 */
userSchema.methods.lastName = function() {
    return (this.personalData.familyName) ? this.personalData.familyName : null;
};

/**
 * @param {Object<string, Object<string, {created_at: Date, value: string, timeSpentOnAssignmentInSeconds: int, isSkipped:boolean}[]>>} submissions The user's submissions
 * @param {string} lessonHash The lesson hash
 * @param {string} assignmentName The name of the assignment
 * @param {string} submissionValue The submission value
 * @param {Boolean} isSkipped True if the lesson is skipped
 * @return {Object<string, Object<string, {created_at: Date, value: string, timeSpentOnAssignmentInSeconds: int, isSkipped:boolean}[]>>} The updated "submissions" object
 */
const _getUpdatedSubmissions = function(submissions, lessonHash, assignmentName, submissionValue, isSkipped) {
    /* Initialize submission object */
    const submissionObject = {created_at: new Date(), value: submissionValue, timeSpentOnAssignmentInSeconds: 0, isSkipped: isSkipped};

    /* Get existing submissions for the lesson */
    const lessonSubmissions = submissions[lessonHash];

    /* Submission exists for lesson */
    if (lessonSubmissions) {
        /* Get existing submissions for the assignment */
        const assignmentSubmissions = submissions[lessonHash][assignmentName];
        /* Submission exists for assignment */
        if (assignmentSubmissions) {
            assignmentSubmissions.push(submissionObject);
            /* Submission doesn't exist for assignment */
        } else {
            submissions[lessonHash][assignmentName] = [submissionObject];
        }
        /* Submission doesn't exist for lesson */
    } else {
        submissions[lessonHash] = {};
        submissions[lessonHash][assignmentName] = [submissionObject];
    }

    /* Return */
    return submissions;
};

/**
 * @param {object} lesson
 * @param {object} assignment
 * @param {string} submissionValue
 * @param {boolean} isSkipped
 * @return {Promise<User>}
 */
userSchema.methods.saveSubmission = async function(lesson, assignment, submissionValue, isSkipped) {
    /* Update Submissions */
    this.submissions = _getUpdatedSubmissions(this.submissions, lesson.hash, assignment.name, submissionValue, isSkipped);

    /* Update progress map for project */
    const project = curriculumRepository.getProjectByHash(lesson.hash, this.getFullLocaleCodeOrDefault());
    if (project) {
        this.projectProgress.progressMap = this.updateProgressMapForProject(project);
    }

    /* Update progress map for concept */
    const concept = curriculumRepository.getConceptByHash(lesson.hash, this.getFullLocaleCodeOrDefault());
    if (concept) {
        this.conceptProgress.progressMap = this.updateProgressMapForConcept(concept);
    }

    /* Update level progress */
    const totalSubmissionCount = this.getTotalSubmissionCount();

    /* Update levelProgress */
    this.levelProgress = this.levelProgress || {};
    this.levelProgress.hasNewBadges = false;
    this.levelProgress.newlyUnlockedBadgeIds = [];

    for (const badge of badges.getAllLocalizedBadges(this.getFullLocaleCodeOrDefault())) {
        checkAndAddBadgeIfUnlocked.call(this, badge);
    }

    this.levelProgress.finishFirstProject = (totalSubmissionCount >= curriculumRepository.getStarterProjectAssignmentCountForLocale(this.locale.fullLocaleCode));
    this.levelProgress.numberOfMissingTasks =
        (this.levelProgress.firstAssignment ? 0 : 1) +
        (this.levelProgress.fifthAssignment ? 0 : 1) +
        (this.levelProgress.slackRegistration ? 0 : 1) +
        (this.levelProgress.finishFirstProject ? 0 : 1) +
        (this.levelProgress.referFirstFriend ? 0 : 1);

    /* Update user */
    this.markModified("submissions");
    this.markModified("projectProgress");
    this.markModified("projectProgress.progressMap");
    this.markModified("conceptProgress");
    this.markModified("conceptProgress.progressMap");
    this.markModified("levelProgress");

    /* TODO: this is a code for the Student Showcase GRW project, contains fixed literals.
        Remove this or refactor it at the end of the experiment */
    if (lesson.hash === 'qnurko' && assignment.name === 'assignment06'
        || lesson.hash === 'erthue' && assignment.name === 'assignment01') {

        await slackSender.sendMessageToSlack(
            config.get('slack:STUDENT_PROJECTS_WEBHOOK_URL'),
            `New Submission on *${lesson.title}: ${assignment.title}*`,
            'Student Projects Bot',
            '#student-projects',
            ':female-teacher:',
            '#FF8C00',
            `*${this.personalData.fullName} | ${this.personalData.email} | ${this.locale.fullLocaleCode}*`,
            `${submissionValue}`);
    }

    try {
        return await this.save();
    } catch(error) {
        logger.error('USER | saveSubmission | User saving error.', error);
    }
};

function checkAndAddBadgeIfUnlocked(badge) {
    /* Create the field if it doesn't exist */
    this.levelProgress[badge.condition] = this.levelProgress[badge.condition] || false;

    /* Make sure that the badge is available, isn't unlocked before and check if it meets the condition to unlock now */
    if (badge.isAvailable && !this.levelProgress[badge.condition] && badge.checkerFunction(this)) {
        this.levelProgress.hasNewBadges |= true;
        this.levelProgress[badge.condition] = true;
        this.levelProgress.newlyUnlockedBadgeIds.push(badge.id);
    }
}

userSchema.methods.cleanNewBadges = function() {
    this.levelProgress.hasNewBadges = false;
    this.levelProgress.newlyUnlockedBadgeIds = [];

    this.markModified("levelProgress");

    /* Save user */
    this.save(function(error) {
        if (error) {
            logger.error('USER | cleanNewBadges | Saving error.', error);
        }
    });
};

/**
 * Increments the number of mood feedback that the user gave
 * It also checks that the user gave at least 3 mood feedback
 */
userSchema.methods.incrementMoodFeedbackCount = function() {
    this.levelProgress.moodFeedbackCount = (this.levelProgress.moodFeedbackCount + 1);

    this.markModified("levelProgress");

    /* Save user */
    this.save(function(error) {
        if (error) {
            logger.error('USER | incrementMoodFeedbackCount | Saving error.', error);
            return false;
        }
        return true;
    });
};

/**
 * Increments the number of text feedback that the user gave
 * It also checks that the user gave at least 1 text feedback
 */
userSchema.methods.incrementTextFeedbackCount = function() {
    this.levelProgress.textFeedbackCount = (this.levelProgress.textFeedbackCount + 1);

    this.markModified("levelProgress");

    /* Save user */
    this.save(function(error) {
        if (error) {
            logger.error('USER | incrementTextFeedbackCount | Saving error.', error);
            return false;
        }
        return true;
    });
};

/**
 * @returns {object[]} All completed, available badges (hidden too), sorted by ID.
 */
userSchema.methods.getCompletedBadges = function() {
    const allBadges = badges.getAllLocalizedBadges(this.getFullLocaleCodeOrDefault());
    const allAvailableBadges = allBadges.filter(badge => badge.isAvailable);
    const completedBadges = allAvailableBadges.filter(badge => this.levelProgress[badge.condition]);
    completedBadges.sort((badge1, badge2) => badge1.id - badge2.id);
    return completedBadges;
};

/**
 * @returns {object[]} All non-completed, available, non-hidden badges, sorted by ID.
 */
userSchema.methods.getBadgesInProgress = function() {
    const allBadges = badges.getAllLocalizedBadges(this.getFullLocaleCodeOrDefault());
    const allAvailableBadges = allBadges.filter(badge => badge.isAvailable);
    const badgesInProgress = allAvailableBadges.filter(badge => !this.levelProgress[badge.condition]);
    badgesInProgress.sort((badge1, badge2) => badge1.id - badge2.id);
    return badgesInProgress;
};

/**
 * @param {int} badgeId
 */
userSchema.methods.addBadgeId = function(badgeId) {
    if (this.badges.indexOf(badgeId) !== -1) {
        return;
    }

    this.model('User').update({_id: this.id}, {$push: {'badges': badgeId}},
        function(error) {
            if (error) {
                logger.error('USER | addBadgeId | Update error.', error);
            }
        });
};

/**
 * @return {Number} The total submission count
 */
userSchema.methods.getTotalSubmissionCount = function() {
    /* Initialize variables */
    let totalSubmissionCount = 0;
    for (let submissionIndex in this.submissions) {
        if (this.submissions.hasOwnProperty(submissionIndex)) {
            totalSubmissionCount += Object.keys(this.submissions[submissionIndex]).length;
        }
    }

    /* Return */
    return totalSubmissionCount;
};

/**
 * @returns {string} The locale code, e.g. "hu-HU". If the user doesn't have a locale set up, falls back to the default.
 */
userSchema.methods.getFullLocaleCodeOrDefault = function() {
    return this.locale.fullLocaleCode || i18nHelper.getDefaultLocale().fullLocaleCode;
};

/* Fill automatic fields */
userSchema.pre('save', function(next) {
    /* Full name */
    if (this.personalData) {
        this.personalData.fullName = this.name();
        this.personalData.initials = this.initials();
    } else {
        this.personalData = {
            email: '',
            familyName: '',
            givenName: '',
            fullName: '',
            initials: ''
        };
    }
    /* Do callback */
    next();
});

/* ---------- Module body */
/* ---------- Module exports */
module.exports = mongoose.model('User', userSchema);
