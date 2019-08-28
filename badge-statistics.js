const localeRepository = require('@codeberry/nodejs').locales;

/**
 * @param {User} user User to check their streak for
 * @param {number} minimumDayCount Count of days to check
 * @returns {boolean} Is N days streak reached
 */
checkNDaysStreak = function(user, minimumDayCount) {
    let longestStreak = 0;
    let streak = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);

    submissionsCreatedAt.map(function(date) {
        date.setHours(0,0,0,0);
    });

    let previousSubmissionDay = submissionsCreatedAt[0];

    /* Find the longest streak */
    for (let submissionDay of submissionsCreatedAt) {
        if((submissionDay - previousSubmissionDay)/(60*60*24*1000) === 1) {
            streak++;
            if (streak > longestStreak) {
                longestStreak = streak;
            }
        } else if ((submissionDay - previousSubmissionDay) === 0) {
            /* Do nothing */
        } else {
            streak = 0;
        }
        previousSubmissionDay = submissionDay;
    }

    return (longestStreak >= minimumDayCount);
};

/**
 * @param {User} user User to check their streak for
 * @returns {number} Count of days in the actual streak
 */
getCurrentStreak = function (user) {
    let streak = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user).reverse();

    submissionsCreatedAt.map(function(date) {
        date.setHours(0,0,0,0);
    });

    /* Return 0 if the streak has been aborted */
    if ((new Date().setHours(0,0,0,0) - submissionsCreatedAt[0])/(60*60*24*1000) > 1) {
        return streak;
    }

    let previousSubmissionDay = submissionsCreatedAt[0];

    /* Count the latest streak */
    for (let submissionDay of submissionsCreatedAt) {
        if((submissionDay - previousSubmissionDay)/(60*60*24*1000) === -1) {
            streak++;
        } else if ((submissionDay - previousSubmissionDay) === 0) {
            /* Do nothing */
        } else {
            break;
        }
        previousSubmissionDay = submissionDay;
    }

    return streak;
};


/**
 * @param {User} user
 * @param minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Has N submissions made
 */
hasNSubmissionMade = function(user, minimumSubmissionCount) {
    return (user.getTotalSubmissionCount() >= minimumSubmissionCount);
};

/**
 * @param {User} user
 * @param bookName Name of the book in progressMap
 * @returns {boolean} Is book finished
 */
isBookFinished = function(user, bookName) {
    return (user.projectProgress.progressMap.hasOwnProperty(bookName)) &&
        (user.projectProgress.progressMap[bookName].isFinished || false);
};

/**
 * @param {User} user
 * @param {number} minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Is the count of submissions at least N
 */
hasMadeAtLeastNSubmissionBetween10PMAnd3AM = function(user, minimumSubmissionCount) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getHours() >= 22 || submissionDate.getHours() < 3) {
            submissionCount++;
        }
    }
    return (submissionCount >= minimumSubmissionCount);
};

getSubmissionMadeBetween10PMAnd3AMCount = function(user) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getHours() >= 22 || submissionDate.getHours() < 3) {
            submissionCount++;
        }
    }
    return submissionCount;
};

/**
 * @param {User} user
 * @param {number} minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Is the count of submissions at least N
 */
hasMadeAtLeastNSubmissionBetween3AMAnd7AM = function(user, minimumSubmissionCount) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getHours() >= 3 && submissionDate.getHours() < 7) {
            submissionCount++;
        }
    }
    return (submissionCount >= minimumSubmissionCount);
};

getSubmissionMadeBetween3AMAnd7AMCount = function(user) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getHours() >= 3 && submissionDate.getHours() < 7) {
            submissionCount++;
        }
    }
    return submissionCount;
};

/**
 * @param {User} user
 * @param {number} minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Is the count of submissions at least N
 */
hasMadeAtLeastNSubmissionOnWeekends = function(user, minimumSubmissionCount) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for (let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getDay() === 6 || submissionDate.getDay() === 0) {
            submissionCount++;
        }
    }
    return (submissionCount >= minimumSubmissionCount);
};

getSubmissionMadeOnWeekendsCount = function(user) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for (let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getDay() === 6 || submissionDate.getDay() === 0) {
            submissionCount++;
        }
    }
    return submissionCount;
};

/**
 * @param {User} user
 * @param {number} minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Is the count of submissions at least N
 */
hasMadeAtLeastNSubmissionOnFridayThe13th = function(user, minimumSubmissionCount) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getDay() === 5 && submissionDate.getDate() === 13) {
            submissionCount++;
        }
    }
    return (submissionCount >= minimumSubmissionCount);
};

getSubmissionMadeOnFridayThe13thCount = function(user) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getDay() === 5 && submissionDate.getDate() === 13) {
            submissionCount++;
        }
    }
    return submissionCount;
};

/**
 * @param {User} user
 * @param {number} minimumSubmissionCount Count of submissions to check
 * @returns {boolean} Is the count of submissions at least N
 */
hasMadeAtLeastNSubmissionOnNewYearsDay = function(user, minimumSubmissionCount) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getMonth() === 0 && submissionDate.getDate() === 1) {
            submissionCount++;
        }
    }
    return (submissionCount >= minimumSubmissionCount);
};

getSubmissionMadeOnNewYearsDayCount = function(user) {
    let submissionCount = 0;
    let submissionsCreatedAt = getSubmissionsCreatedAtArray(user);
    for(let submissionDate of submissionsCreatedAt) {
        if (submissionDate.getMonth() === 0 && submissionDate.getDate() === 1) {
            submissionCount++;
        }
    }
    return submissionCount;
};

/**
 * @param {User} user
 * @param {number} minimumMoodFeedbackCount Count of feedback to check
 * @returns {boolean} Is the count of feedback at least N
 */
hasAddedAtLeastNMoodFeedback = function(user, minimumMoodFeedbackCount) {
    return (user.levelProgress.moodFeedbackCount >= minimumMoodFeedbackCount);
};

/**
 * @param {User} user
 * @returns {number} Count of feedback
 */
getMoodFeedbackCount = function(user) {
    return user.levelProgress.moodFeedbackCount;
};

/**
 * @param {User} user
 * @param {number} minimumInlineSurveyCount Count of feedback to check
 * @returns {boolean} Is the count of feedback at least N
 */
hasAddedAtLeastNInlineSurveyFeedbacks = function(user, minimumInlineSurveyCount) {
    return (user.surveySubmissions.length >= minimumInlineSurveyCount);
};

/**
 * @param {User} user
 * @returns {number} Count of feedback
 */
getInlineSurveyFeedbackCount = function(user) {
    return user.surveySubmissions.length;
};

/* These badges are set from central.js */
checkSlackRegistration = function() {
    return false;
};
checkReferFirstFriend = function() {
    return false;
};
checkDiscoveredBugEvent = function() {
    return false;
};
checkWroteBlogPostEvent = function() {
    return false;
};
checkWroteFacebookReviewEvent = function() {
    return false;
};

hasRegisteredToSlack = function(user) {
    return user.levelProgress.slackRegistration;
};
hasReferredFirstFriend = function(user) {
    return user.levelProgress.referFirstFriend;
};
hasDiscoveredBug = function(user) {
    return user.levelProgress.discoveredBug;
};
hasWrittenBlogPost = function(user) {
    return user.levelProgress.wroteBlogPost;
};
hasWrittenFacebookReview = function(user) {
    return user.levelProgress.wroteFacebookReview;
};

/**
 * @param {User} user
 * @returns {array} Array with submission created at date objects
 */
function getSubmissionsCreatedAtArray(user) {
    const locale = localeRepository.getLocaleByFullLocaleCode(user.locale.fullLocaleCode);
    const submissionsCreatedAtArray = [];
    /* Get all of the submission dates */
    for (let lesson in user.submissions) {
        if (user.submissions.hasOwnProperty(lesson)) {
            for (let assignment in user.submissions[lesson]) {
                if (user.submissions[lesson].hasOwnProperty(assignment)) {
                    for (let index in user.submissions[lesson][assignment]) {

                        if (user.submissions[lesson][assignment].hasOwnProperty(index)) {
                            if (user.submissions[lesson][assignment][index].hasOwnProperty('created_at')) {
                                submissionsCreatedAtArray.push(new Date(user.submissions[lesson][assignment][index].created_at.toLocaleString('default', {timeZone: locale.timeZone})));
                            }
                        }
                    }
                }
            }
        }
    }

    /* Sort submission_created_at by date */
    submissionsCreatedAtArray.sort((date1, date2) => {
        if (date1 > date2) return 1;
        if (date1 < date2) return -1;
        return 0;
    });

    return submissionsCreatedAtArray;
}

module.exports = {
    checkNDaysStreak,
    getCurrentStreak,
    hasNSubmissionMade,
    isBookFinished,
    hasMadeAtLeastNSubmissionBetween10PMAnd3AM,
    hasMadeAtLeastNSubmissionBetween3AMAnd7AM,
    hasMadeAtLeastNSubmissionOnWeekends,
    hasMadeAtLeastNSubmissionOnFridayThe13th,
    hasMadeAtLeastNSubmissionOnNewYearsDay,
    getSubmissionMadeBetween10PMAnd3AMCount,
    getSubmissionMadeBetween3AMAnd7AMCount,
    getSubmissionMadeOnWeekendsCount,
    getSubmissionMadeOnFridayThe13thCount,
    getSubmissionMadeOnNewYearsDayCount,
    hasAddedAtLeastNMoodFeedback,
    hasAddedAtLeastNInlineSurveyFeedbacks,
    getMoodFeedbackCount,
    getInlineSurveyFeedbackCount,
    checkSlackRegistration,
    checkReferFirstFriend,
    checkDiscoveredBugEvent,
    checkWroteBlogPostEvent,
    checkWroteFacebookReviewEvent,
    hasRegisteredToSlack,
    hasReferredFirstFriend,
    hasDiscoveredBug,
    hasWrittenBlogPost,
    hasWrittenFacebookReview
};