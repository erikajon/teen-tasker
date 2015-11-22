/*global angular */

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the jobStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('tasker')
	.controller('JobCtrl', function JobCtrl($scope, $routeParams, $filter, appStorage, $window) {
		'use strict';

	  var EMPLOYER_ID = 'demo-employer';  // temp hack
      function scopeTestNewSubmit () {
      	var newJob = {
      		employer: EMPLOYER_ID,
      		status: $scope.JOB_STATUS.JOB_STATUS_OPEN,
			title: $scope.newJob.title.trim(),
			duration: $scope.newJob.duration,
			price: $scope.newJob.price,
			location: $scope.newJob.location.trim(),
			when: $scope.newJob.when.getTime() || Date.now(),
			details: $scope.newJob.details,
			completed: false
		};
        appStorage.addJob(newJob);
        $scope.newJob = {};
        $window.location = "/#/jobs"
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

        $scope.submit = scopeTestNewSubmit;
      }

      init();
	});
