/* ---------- Module requirements */

const badgeStatistics = require('./badge-statistics');
const i18n = require('i18n');

/* ---------- Module body */
const badges = [
    {
        id: 1,
        category: 'behavior',
        name: 'Persistent',
        task: 'Study for 3 days in a row',
        condition: 'streak3Days',
        completionState: 3,
        checkerFunction: user => badgeStatistics.checkNDaysStreak(user, 3),
        stateGetterFunction: user => badgeStatistics.getCurrentStreak(user),
        flavorText: 'You learned for three days straight. Not bad!',
        image: '/badge/images/01.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 2,
        category: 'behavior',
        name: 'Determined',
        task: 'Study for 7 days in a row',
        condition: 'streak7Days',
        completionState: 7,
        checkerFunction: user => badgeStatistics.checkNDaysStreak(user, 7),
        stateGetterFunction: user => badgeStatistics.getCurrentStreak(user),
        flavorText: 'A whole week without taking a break. Respect.',
        image: '/badge/images/02.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 3,
        category: 'behavior',
        name: 'Purposeful',
        task: 'Study for 30 days in a row',
        condition: 'streak30Days',
        completionState: 30,
        checkerFunction: user => badgeStatistics.checkNDaysStreak(user, 30),
        stateGetterFunction: user => badgeStatistics.getCurrentStreak(user),
        flavorText: 'A month without stopping? You\'re running marathons in your free time, right?',
        image: '/badge/images/03.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 4,
        category: 'behavior',
        name: 'Tireless',
        task: 'Study for 100 days in a row',
        condition: 'streak100Days',
        completionState: 100,
        checkerFunction: user => badgeStatistics.checkNDaysStreak(user, 100),
        stateGetterFunction: user => badgeStatistics.getCurrentStreak(user),
        flavorText: 'A hundred days without breaking a sweat. We are truly impressed.',
        image: '/badge/images/04.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 5,
        category: 'behavior',
        name: 'Iron-Willed',
        task: 'Study for 365 days in a row',
        condition: 'streak365Days',
        completionState: 365,
        checkerFunction: user => badgeStatistics.checkNDaysStreak(user, 365),
        stateGetterFunction: user => badgeStatistics.getCurrentStreak(user),
        flavorText: 'You started programming every day for an entire year. We couldn\'t be more proud of you',
        image: '/badge/images/05.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 10,
        category: 'feedback',
        name: 'Source of Inspiration',
        task: 'Click feedback emojis on at least 3 lessons',
        condition: 'gaveAtLeast3MoodFeedback',
        completionState: 3,
        checkerFunction: user => badgeStatistics.hasAddedAtLeastNMoodFeedback(user, 3),
        stateGetterFunction: user => badgeStatistics.getMoodFeedbackCount(user),
        flavorText: 'Thanks! You just helped us make this school even better.',
        image: '/badge/images/10.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 11,
        category: 'feedback',
        name: 'Seeing Clearly',
        task: 'Give feedback on at least one in-line survey',
        condition: 'gaveAtLeast1InlineSurveyFeedbacks',
        completionState: 1,
        checkerFunction: user => badgeStatistics.hasAddedAtLeastNInlineSurveyFeedbacks(user, 1),
        stateGetterFunction: user => badgeStatistics.getInlineSurveyFeedbackCount(user),
        flavorText: 'Hey, thanks! We want you to know that your answers matter a lot to us.',
        image: '/badge/images/11.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 12,
        category: 'onboarding',
        name: 'Hive Mind',
        task: 'Join the Slack community',
        condition: 'slackRegistration',
        completionState: '',
        checkerFunction: badgeStatistics.checkSlackRegistration,
        stateGetterFunction: user => badgeStatistics.hasRegisteredToSlack(user),
        flavorText: 'We\'re here every day. Thanks for joining us!',
        image: '/badge/images/12.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 33,
        category: 'progress',
        name: 'The Hardest of All',
        task: 'Submit at least 1 assignment',
        condition: 'firstAssignment',
        completionState: 1,
        checkerFunction: user => badgeStatistics.hasNSubmissionMade(user, 1),
        stateGetterFunction: user => user.getTotalSubmissionCount(),
        flavorText: 'The first step is always the hardest. We\'re proud of you.',
        image: '/badge/images/33.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 34,
        category: 'progress',
        name: 'Gaining Momentum',
        task: 'Submit at least 5 assignments',
        condition: 'fifthAssignment',
        completionState: 5,
        checkerFunction: user => badgeStatistics.hasNSubmissionMade(user, 5),
        stateGetterFunction: user => user.getTotalSubmissionCount(),
        flavorText: 'Keep up the good work. You\'ll get this coding thing in no time.',
        image: '/badge/images/34.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 35,
        category: 'progress',
        name: 'Foundation',
        task: 'Submit at least 25 assignments',
        condition: 'twentyFifthAssignment',
        completionState: 25,
        checkerFunction: user => badgeStatistics.hasNSubmissionMade(user, 25),
        stateGetterFunction: user => user.getTotalSubmissionCount(),
        flavorText: 'You\'re making great strides forward.',
        image: '/badge/images/35.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 36,
        category: 'progress',
        name: 'Solid Basics',
        task: 'Submit at least 100 assignments',
        condition: 'oneHundredthAssignment',
        completionState: 100,
        checkerFunction: user => badgeStatistics.hasNSubmissionMade(user, 100),
        stateGetterFunction: user => user.getTotalSubmissionCount(),
        flavorText: 'A perfect 100. Remember when you knew nothing about programming? Seems distant, right?',
        image: '/badge/images/36.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 37,
        category: 'progress',
        name: 'Getting There',
        task: 'Submit at least 300 assignments',
        condition: 'threeHundredthAssignment',
        completionState: 300,
        checkerFunction: user => badgeStatistics.hasNSubmissionMade(user, 300),
        stateGetterFunction: user => user.getTotalSubmissionCount(),
        flavorText: 'All the Spartans would be proud. We are too.',
        image: '/badge/images/37.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 40,
        category: 'referral',
        name: 'Together',
        task: 'Invite a friend',
        condition: 'referFirstFriend',
        completionState: 1,
        checkerFunction: badgeStatistics.checkReferFirstFriend,
        stateGetterFunction: user => badgeStatistics.hasReferredFirstFriend(user),
        flavorText: 'One of us. One of us.',
        image: '/badge/images/40.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 13,
        category: 'progress',
        name: 'Baby Steps',
        task: 'Complete the "Welcome" Book',
        condition: 'bookWelcome',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'welcome-project'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'welcome-project'),
        flavorText: 'Congratulations! You just took your first steps towards becoming a programmer.',
        image: '/badge/images/13.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 14,
        category: 'progress',
        name: 'Tools at the Ready',
        task: 'Complete the "Developer Tools" Book',
        condition: 'bookDeveloperTools',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'hello-codeberry'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'hello-codeberry'),
        flavorText: 'A developer needs an environment. Good job setting up GitHub and JS Bin!',
        image: '/badge/images/14.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 15,
        category: 'progress',
        name: 'The Language of Structure',
        task: 'Complete the "HTML Basics" Book',
        condition: 'bookHTMLBasics',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'html-basics'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'html-basics'),
        flavorText: 'HTML is the foundation of everything on the web. Now you can build on that.',
        image: '/badge/images/15.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 16,
        category: 'progress',
        name: 'The Language of Presentation',
        task: 'Complete the "Basics of CSS" Book',
        condition: 'bookBasicsOfCSS',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'css-basics'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'css-basics'),
        flavorText: 'Hey good-looking, congratulations on learning the basics of CSS3!',
        image: '/badge/images/16.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 17,
        category: 'progress',
        name: 'Published Author',
        task: 'Complete the "Medium Article" Book',
        condition: 'bookMediumArticle',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'medium-article-v2'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'medium-article-v2'),
        flavorText: 'Congrats on completing the Medium article!',
        image: '/badge/images/17.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 18,
        category: 'progress',
        name: 'Painting like Mondrian',
        task: 'Complete the "Mondrian" Book',
        condition: 'bookMondrian',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'mondrian-painting'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'mondrian-painting'),
        flavorText: 'Have you painted before? You seem talented.',
        image: '/badge/images/18.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 19,
        category: 'progress',
        name: 'Calling Card',
        task: 'Complete the "About Me Site" Book',
        condition: 'bookAboutMeSite',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'about-me'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'about-me'),
        flavorText: 'Everybody needs a personal site. Now you have one, too.',
        image: '/badge/images/19.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 20,
        category: 'progress',
        name: 'From XS to XXL',
        task: 'Complete the "Responsive Web Design" Book',
        condition: 'bookResponsiveWebDesign',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'responsive-web-design'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'responsive-web-design'),
        flavorText: 'From the tiniest of smartphones to the biggest 4K TVs – you can now design for them all.',
        image: '/badge/images/20.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 21,
        category: 'progress',
        name: 'Floating Boxes',
        task: 'Complete the "Everything in Its Place" Book',
        condition: 'bookEverythingInItsPlace',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'positioning'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'positioning'),
        flavorText: 'Good job laying out those boxes! Gutenberg would be proud.',
        image: '/badge/images/21.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 22,
        category: 'progress',
        name: 'Recycled',
        task: 'Complete the "Common Components" Book',
        condition: 'bookCommonComponents',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'common-components'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'common-components'),
        flavorText: 'Don\'t reinvent the wheel—you\'re smarter than that.',
        image: '/badge/images/22.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 23,
        category: 'progress',
        name: 'A Happy Couple',
        task: 'Complete the "Wedding Landing" Book',
        condition: 'bookWeddingLanding',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'wedding-landing'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'wedding-landing'),
        flavorText: 'A beautiful page for a beautiful day. Nice work on that wedding page!',
        image: '/badge/images/23.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 24,
        category: 'progress',
        name: 'The Big Move',
        task: 'Complete the "Desktop Editor" Book',
        condition: 'bookDesktopEditor',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'desktop-editor'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'desktop-editor'),
        flavorText: 'A serious pro needs serious tools.',
        image: '/badge/images/24.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 25,
        category: 'progress',
        name: 'Branching Tree',
        task: 'Complete the "Git Basics" Book',
        condition: 'bookGitBasics',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'git-basics'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'git-basics'),
        flavorText: 'Git? No problem.',
        image: '/badge/images/25.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 26,
        category: 'progress',
        name: 'A Different Kind of Calculator',
        task: 'Complete the "JS Basics I (Data Types)" Book',
        condition: 'bookJSBasicsI',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-1'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-1'),
        flavorText: 'Who needs a calculator when you\'ve got JavaScript?',
        image: '/badge/images/26.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 27,
        category: 'progress',
        name: 'X, Y, and Z',
        task: 'Complete the "JS Basics II (Variables)" Book',
        condition: 'bookJSBasicsII',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-2'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-2'),
        flavorText: 'Getting the hang of variables is an important step. We\'re proud of you.',
        image: '/badge/images/27.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 28,
        category: 'progress',
        name: 'Deja Vu',
        task: 'Complete the "JS Basics III (Loops)" Book',
        condition: 'bookJSBasicsIII',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-3'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-3'),
        flavorText: 'Am I repeating myself? Maybe we are in a loop.',
        image: '/badge/images/28.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 29,
        category: 'progress',
        name: 'Red Pill, Blue Pill',
        task: 'Complete the "JS Basics IV (Conditionals)" Book',
        condition: 'bookJSBasicsIV',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-4'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-4'),
        flavorText: 'Decisions are hard.',
        image: '/badge/images/29.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 30,
        category: 'progress',
        name: 'The Little Robots',
        task: 'Complete the "JS Basics V (Functions)" Book',
        condition: 'bookJSBasicsV',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-5'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-5'),
        flavorText: 'Everything is easier with functions. Trust us.',
        image: '/badge/images/30.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 31,
        category: 'progress',
        name: 'The Ultimate List',
        task: 'Complete the "JS Basics VI (Arrays)" Book',
        condition: 'bookJSBasicsVI',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-6'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-6'),
        flavorText: 'Isn\'t that neat? Everything in order, on a beautiful list. *Sigh*',
        image: '/badge/images/31.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 32,
        category: 'progress',
        name: 'Librarian',
        task: 'Complete the "JS Basics VII (Objects)" Book',
        condition: 'bookJSBasicsVI',
        completionState: '',
        checkerFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-7'),
        stateGetterFunction: user => badgeStatistics.isBookFinished(user, 'javascript-basics-7'),
        flavorText: 'Objects. Objects everywhere.',
        image: '/badge/images/32.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 9,
        category: 'feedback',
        name: 'Dr. Watson',
        task: 'Discover a bug and report it to customer support',
        condition: 'discoveredBug',
        completionState: 1,
        checkerFunction: badgeStatistics.checkDiscoveredBugEvent,
        stateGetterFunction: user => badgeStatistics.hasDiscoveredBug(user),
        flavorText: 'No detail can escape you. You could moonlight as a detective.',
        image: '/badge/images/09.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 41,
        category: 'referral',
        name: 'Messenger',
        task: 'Write a blog post about CodeBerry',
        condition: 'wroteBlogPost',
        completionState: 1,
        checkerFunction: badgeStatistics.checkWroteBlogPostEvent,
        stateGetterFunction: user => badgeStatistics.hasWrittenBlogPost(user),
        flavorText: 'Bearer of good or bad news. Either way, thanks for the post!',
        image: '/badge/images/41.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 42,
        category: 'referral',
        name: 'Trendsetter',
        task: 'Review CodeBerry on Facebook',
        condition: 'wroteFacebookReview',
        completionState: 1,
        checkerFunction: badgeStatistics.checkWroteFacebookReviewEvent,
        stateGetterFunction: user => badgeStatistics.hasWrittenFacebookReview(user),
        flavorText: 'Tell us, how does it feel to be an influencer?',
        image: '/badge/images/42.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 6,
        category: 'behavior',
        name: 'Night Owl',
        task: 'Submit at least 10 assignments between 10PM and 3AM',
        condition: 'submissionsMadeBetween10PMAnd3AM',
        completionState: 10,
        checkerFunction: user => badgeStatistics.hasMadeAtLeastNSubmissionBetween10PMAnd3AM(user, 10),
        stateGetterFunction: user => badgeStatistics.getSubmissionMadeBetween10PMAnd3AMCount(user),
        flavorText: 'Pulling an all-nighter? You run on caffeine and code, don\'t you?',
        image: '/badge/images/06.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 7,
        category: 'behavior',
        name: 'Early Bird',
        task: 'Submit at least 10 assignments between 3AM and 7AM',
        condition: 'submissionsMadeBetween3AMAnd7AM',
        completionState: 10,
        checkerFunction: user => badgeStatistics.hasMadeAtLeastNSubmissionBetween3AMAnd7AM(user, 10),
        stateGetterFunction: user => badgeStatistics.getSubmissionMadeBetween3AMAnd7AMCount(user),
        flavorText: 'Gets the worm. Or maybe this sweet badge.',
        image: '/badge/images/07.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 8,
        category: 'behavior',
        name: 'Weekend Warrior',
        task: 'Submit at least 10 assignments on the weekends',
        condition: 'submissionsMadeOnWeekends',
        completionState: 10,
        checkerFunction: user => badgeStatistics.hasMadeAtLeastNSubmissionOnWeekends(user, 10),
        stateGetterFunction: user => badgeStatistics.getSubmissionMadeOnWeekendsCount(user),
        flavorText: 'While others relax, you push ahead. Impressive.',
        image: '/badge/images/08.png',
        isHidden: false,
        isAvailable: true
    },
    {
        id: 38,
        category: 'random',
        name: 'Lucky',
        task: 'HIDDEN',
        condition: 'submissionMadeOnFridayThe13th',
        completionState: 1,
        checkerFunction: user => badgeStatistics.hasMadeAtLeastNSubmissionOnFridayThe13th(user, 1),
        stateGetterFunction: user => badgeStatistics.getSubmissionMadeOnFridayThe13thCount(user),
        flavorText: 'Have you seen our black cat? We haven\'t seen him all day.',
        image: '/badge/images/38.png',
        isHidden: true,
        isAvailable: true
    },
    {
        id: 39,
        category: 'random',
        name: 'A Fresh Start',
        task: 'HIDDEN',
        condition: 'submissionMadeOnNewYearsDay',
        completionState: 1,
        checkerFunction: user => badgeStatistics.hasMadeAtLeastNSubmissionOnNewYearsDay(user, 1),
        stateGetterFunction: user => badgeStatistics.getSubmissionMadeOnNewYearsDayCount(user),
        flavorText: 'Everything will be different this time. No, seriously.',
        image: '/badge/images/39.png',
        isHidden: true,
        isAvailable: true
    }
];

function localizeBadge(badge, locale) {
    return {
        id: badge.id,
        category: badge.category,
        name: i18n.__({phrase: badge.name, locale}),
        task: i18n.__({phrase: badge.task, locale}),
        condition: badge.condition,
        completionState: badge.completionState,
        checkerFunction: badge.checkerFunction,
        stateGetterFunction: badge.stateGetterFunction,
        flavorText: i18n.__({phrase: badge.flavorText, locale}),
        image: badge.image,
        isHidden: badge.isHidden,
        isAvailable: badge.isAvailable,
    };
}

/* ---------- Module functions */

/**
 * @param {string} locale
 * @returns {{task, flavorText, checkerFunction, image, isAvailable, condition, name, stateGetterFunction, id, category, completionState, isHidden}[]}
 */
function getAllLocalizedBadges(locale) {
    return badges.map(badge => localizeBadge(badge, locale));
}

/**
 * @param {int[]} badgeIds
 * @param {string} locale
 * @returns {{task, flavorText, checkerFunction, image, isAvailable, condition, name, stateGetterFunction, id, category, completionState, isHidden}[]} The badges.
 */
function getLocalizedBadges(badgeIds, locale) {
    return badgeIds
        .map(badgeId => badges.find(badge => badge.id === badgeId))
        .map(badge => localizeBadge(badge, locale));
}

/**
 *
 * @param {int} badgeId
 * @param {string} locale
 * @returns {{task, flavorText, checkerFunction, image, isAvailable, condition, name, stateGetterFunction, id, category, completionState, isHidden}} The badge.
 */
function getLocalizedBadge(badgeId, locale) {
    return getLocalizedBadges([badgeId], locale)[0];
}

/**
 * @param {int} badgeId
 * @returns {int|string}
 */
function getBadgeCompletionState(badgeId) {
    return badges.find(badge => badge.id === badgeId).completionState;
}

/**
 * @param {int} badgeId
 * @returns {function}
 */
function getBadgeStateGetterFunction(badgeId) {
    return badges.find(badge => badge.id === badgeId).stateGetterFunction;
}

/**
 * @param {string} condition
 * @returns int
 */
function getBadgeIdByCondition(condition) {
    return badges.find(badge => { return badge.condition === condition; }).id;
}

/* ---------- Module exports */
module.exports = {
    getAllLocalizedBadges,
    getLocalizedBadges,
    getLocalizedBadge,
    getBadgeCompletionState,
    getBadgeStateGetterFunction,
    getBadgeIdByCondition,
};