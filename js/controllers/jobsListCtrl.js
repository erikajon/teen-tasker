angular.module('tasker')
  .controller('JobsListCtrl', [
    '$scope',
    'appStorage',
    function JobListCtrl($scope, appStorage) {
      var EMPLOYER_ID = 'demo-employer';  // temp hack

      function init () {
        // load all data variables asynchronously
        appStorage.getAllJobs().then(function (jobs) {
          $scope.jobs = jobs;
        });
        appStorage.getAllApplicants().then(function (applicants) {
          $scope.applicants = applicants;
        });

        // external bindings
        $scope.JOB_STATUS = appStorage.JOB_STATUS;

        // local bindings
        $scope.testNewVars = {};
        $scope.employerId = EMPLOYER_ID;

        $scope.testJobDelete = scopeTestJobDelete;
        $scope.testJobAccept = scopeTestJobAccept;
      }

      function scopeTestJobDelete (e, jobObj) {
        e.preventDefault();
        appStorage.cancelJob(jobObj);
      }

      function scopeTestJobAccept (e, jobId, applicantId) {
        e.preventDefault();
        appStorage.selectApplicant(jobId, applicantId);
      }

      init();
    }
  ]);
