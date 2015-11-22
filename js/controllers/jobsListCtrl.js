Date.prototype.customFormat = function(formatString){
  var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
  YY = ((YYYY=this.getFullYear())+"").slice(-2);
  MM = (M=this.getMonth()+1)<10?('0'+M):M;
  MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
  DD = (D=this.getDate())<10?('0'+D):D;
  DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
  th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
  formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
  h=(hhh=this.getHours());
  if (h==0) h=24;
  if (h>12) h-=12;
  hh = h<10?('0'+h):h;
  hhhh = h<10?('0'+hhh):hhh;
  AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
  mm=(m=this.getMinutes())<10?('0'+m):m;
  ss=(s=this.getSeconds())<10?('0'+s):s;
  return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
};

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

          $scope.jobs.forEach(function (job) {
            if (job.when) job.date = new Date(job.when).customFormat( "#DD#/#MM#/#YYYY#" )
          })
        });
        appStorage.getAllApplicants().then(function (applicants) {
          $scope.applicants = applicants;
        });

        // external bindings
        $scope.JOB_STATUS = appStorage.JOB_STATUS;

        // local bindings
        $scope.testNewVars = {};
        $scope.employerId = EMPLOYER_ID;

        $scope.jobDelete = scopeTestJobDelete;
        $scope.jobAccept = scopeTestJobAccept;
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
