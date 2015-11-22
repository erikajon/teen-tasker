angular.module('tasker')
  .controller('TestCtrl', [
    '$scope',
    'appStorage',
    function JobCtrl($scope, appStorage) {
      var EMPLOYER_ID = 'demo-employer';  // temp hack
      function scopeTestNewSubmit () {
        $scope.testNewVars.employer = EMPLOYER_ID;
        $scope.testNewVars.date = $scope.testNewVars.date ?
          $scope.testNewVars.date.getTime() : Date.now();
        $scope.testNewVars.status = $scope.JOB_STATUS.JOB_STATUS_OPEN;

        appStorage.addJob($scope.testNewVars);
        $scope.testNewVars = {};
      }

      function scopeTestJobDelete (e, jobObj) {
        e.preventDefault();
        appStorage.cancelJob(jobObj);
      }

      function scopeTestJobAccept (e, jobId, applicantId) {
        e.preventDefault();
        appStorage.selectApplicant(jobId, applicantId);
      }

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

        $scope.testNewSubmit = scopeTestNewSubmit;
        $scope.testJobDelete = scopeTestJobDelete;
        $scope.testJobAccept = scopeTestJobAccept;
      }

      init();
    }
  ]);
