var FUNCTIONSERVICE = {
	defaultHome : function($scope) {
		console.debug("Ok, going to default view...");
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak("홈으로 이동합니다.","Korean Female");
        }
        $scope.focus = "default";
	},
	mirror : function($scope) {
		console.debug("Ok, I am Mirror");
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak("오늘 구글 핵페어에 오신 당신이 가장 아름답습니다!","Korean Female");
        }
        $scope.focus = "default";
	},
	whoIsSmartMirror : function($scope) {
		console.log("Who is Smart Mirror");
		if(responsiveVoice.voiceSupport()) {
	          responsiveVoice.speak("저는 당신의 생활가치를 향상 시켜주는 기능을 갖고 있는 거울아 거울아 입니다.      저의 인공지능으로 당신을 알아보고 기억하겠습니다.","Korean Female");
        }
		$scope.focus = "whoissmartmirror";
	},
	hi : function($scope) {
		console.debug("Ok, Hi I am Mirror!!");
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak("안녕하세요. 반가워요! 거울아 거울아 입니다.","Korean Female");
        }
        $scope.focus = "default";
	},
	goSleep : function($scope){
		console.debug("Ok, going to sleep...");
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak("자러 갈게요. 다음에 봐요!","Korean Female");
        }
        $scope.focus = "sleep";
	},
	wake : function($scope) {
		console.debug("Wake up...");
		require('./model/app').predicts(function(message) {

			console.debug("predict result", message);
			if(message == "[1]"){
				config.whoyou.name = "은숙님";
				console.debug("Face Detection value is == 1 ==!!")
				
				$("#titleNoti").removeClass('sujin')
				$("#titleNotiNews").addClass('sujin')
			
			} else if(message == "[0]"){
				config.whoyou.name = "";
				console.debug("Face Detection value is == 0 ==!!")
				
				$("#titleNoti").addClass('sujin')
				$("#titleNotiNews").removeClass('sujin')
				
				$('#main-news-div').load('https://news.google.co.kr/news?pz=1&zx=muklwsp2gkt0 .section-toptop .esc-lead-article-title .titletext',function(){
					$scope.focus = "newsMain";
				});
			} else {
				config.whoyou.name = "";
				console.debug("Face Detection value is == 2 ==!!")
				
				$("#titleNoti").removeClass('sujin')
				$("#titleNotiNews").removeClass('sujin')
				
				$('#main-news-div').load('https://news.google.co.kr/news?pz=1&zx=muklwsp2gkt0 .section-toptop .esc-lead-article-title .titletext',function(){
					$scope.focus = "newsMain";
				});
			}
			});
		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("거울아거울아 입니다.     얼굴인식 중이니 잠시만 기다려 주세요","Korean Female");
          }

    	$scope.focus = "default";
	},
	whatCanISay : function($scope){
		console.debug("Here is a list of commands...");
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak(config.whoyou.name + " 다음은 이용 가능한 메뉴입니다.","Korean Female");
        }
        $scope.focus = "commands";
	},
	map : function($scope,GeolocationService,MapService) {
		console.debug("Home map ...");
        GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
            console.log("Geoposition", geoposition);
            $scope.map = MapService.generateMap(geoposition.coords.latitude+','+geoposition.coords.longitude);

            $scope.focus = "map";
        });
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak(config.whoyou.name+"    현재 위치 입니다.","Korean Female");
        }
	},
	location : function(location,$scope,GeolocationService,MapService) {
		console.debug("Getting map of", location);
        $scope.map = MapService.generateMap(location);
        if(responsiveVoice.voiceSupport()) {
          responsiveVoice.speak(config.whoyou.name + "     "+location + "의 지도입니다.","Korean Female");
        }
        $scope.focus = "map";
	},
	news: function($scope) {
		console.debug("News..");
		
		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak(config.whoyou.name + "    실시간 뉴스입니다.","Korean Female");
          }
		
		$('#news-div').load('https://news.google.co.kr/news?pz=1&zx=muklwsp2gkt0 .section-toptop .esc-lead-article-title .titletext',function(){			
				
  			console.log('news loaded.');
  			//console.log('NES!!!!!' + JSON.stringify($('#news-div')));
  			//NES!!!!!{"0":{},"length":1,"context":{"ng339":2,"$$hashKey":"object:20"},"selector":"#news-div"}
  			
  			/*
  			var objText = "";
  			for(var i in $('#news-div')) {
				objText = [i, $('#news-div')[i]] + "\n";
			}
			
  			//console.log('objText === ' + objText);
  			//objText === andSelf,function (a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}
  			*/
  			
  			//document.getElementById("news-div").innerHTML;
  			//console.log($('#news-div').load('https://news.google.co.kr/news?pz=1&zx=muklwsp2gkt0 .section-toptop .esc-lead-article-title .titletext'));
  			
  		});
  		  		
		$scope.focus = "news";
	},
	playYoutube : function(term,$scope,$sce,YoutubeService) {
		console.log("Play Youtube");
		
		if(responsiveVoice.voiceSupport()) {
        	responsiveVoice.speak(config.whoyou.name + " 유튜브 동영상을 재생합니다.","Korean Female");
        }
		YoutubeService.getYoutube(term,'video').then(function(){
			if(term){
	            var videoId = YoutubeService.getVideoId()
	            $scope.focus = "youtube";
	            $scope.youtubeurl = "http://www.youtube.com/embed/" + videoId + "?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer"
	            $scope.currentYoutubeUrl = $sce.trustAsResourceUrl($scope.youtubeurl);
            }
        });
	},
	stopYoutube : function($scope) {
		console.debug("Stop Youtube");

		if(responsiveVoice.voiceSupport()) {
        	responsiveVoice.speak("유튜브 동영상을 정지합니다.","Korean Female");
        }

		var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"' + 'stopVideo' +   '","args":""}', '*');
        $scope.focus = "commands";
	},
	subway : function(station,linenumber,updown,$scope,SubwayService) {
		console.debug("subway");
		SubwayService.init(station).then(function(){
            SubwayService.getArriveTime(linenumber,updown).then(function(data){
              if(data != null){
                $scope.subwayinfo1 = data[1].ARRIVETIME + "에 " + data[1].SUBWAYNAME + "행 열차";
                $scope.subwayinfo2 = data[2].ARRIVETIME + "에 " + data[2].SUBWAYNAME + "행 열차";
                $scope.subwayinfo3 = data[3].ARRIVETIME + "에 " + data[3].SUBWAYNAME + "행 열차";
                $scope.subwayinfo4 = data[4].ARRIVETIME + "에 " + data[4].SUBWAYNAME + "행 열차";
         
                if(responsiveVoice.voiceSupport()) {
                	responsiveVoice.speak(data[1].ARRIVETIME + "에 " + data[1].SUBWAYNAME + "행 열차가 있습니다. 이어서,"+data[2].ARRIVETIME + "에 " + data[2].SUBWAYNAME + "행 열차가 있습니다.","Korean Female");
                }
              }else{
                $scope.subwayinfo = "운행하는 열차가 없습니다.";
                if(responsiveVoice.voiceSupport()) {
                	responsiveVoice.speak(config.whoyou.name + " 운행하는 열차가 없습니다.","Korean Female");
                }
              }
              $scope.focus = "subway";
            });
          });
	},
	photo : function(PHOTO_INDEX) {
		console.debug("Take a Photo ...");

		if(responsiveVoice.voiceSupport()) {
			responsiveVoice.speak("사진 촬영을 시작합니다.","Korean Female");
		}

		/* 카메라 프로세스 */
		var exec_photo = require('child_process').exec;

		/* 카메라 저장될 위치 설정 */
		var photo_path = __dirname+"/public/photo/"+"photo"+PHOTO_INDEX+'.jpg';

		/* 라즈베리 카메라 촬영 명령*/
		var cmd_photo = 'raspistill -o '+photo_path;
		exec_photo(cmd_photo, function(error, stdout, stderr){
			console.log('Photo Saved : ',photo_path);
			require('./google_drive/app').upload(photo_path);
		});

		// 4초 후 음성 합성 출력
		setTimeout(function() {
			if(responsiveVoice.voiceSupport()) {
				responsiveVoice.speak("사진 촬영이 끝났습니다.","Korean Female");
			}
		}, 4000);
	},
	
	video : function(VIDEO_INDEX) {
		console.debug("Take a Video ...");
		
		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("  비디오 촬영을 시작합니다.","Korean Female");
        }
		
		/* 비디오 프로세스*/
		var exec_video = require('child_process').exec;
		/* 비디오 저장될 위치 설정*/
		var video_path = __dirname+"/public/video/"+"video"+VIDEO_INDEX+'.h264';
		/* 라즈베리 카메라 비디오 명령*/
		var cmd_video = 'raspivid -o '+video_path+' -t 7000';
		
		/* 라즈베리 카메라 비디오 촬영 및 이메일 전송*/
		exec_video(cmd_video, function(errror, stdout, stderr) {
			console.log('Video Saved : ',video_path);
			require('./google_drive/app').upload(video_path);
		});
		
		// 4초 후 음성 합성 출력
		setTimeout(function() {
			if(responsiveVoice.voiceSupport()) {
				responsiveVoice.speak("비디오 촬영이 끝났습니다.","Korean Female");
			}
		}, 7000);
		
	},

	musicplay :function() {
		console.debug("play music");

		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("음악을 재생합니다.", "Korean Female");
		}
	},

	musicnext :function(){
		console.log("next music");
		if(responsiveVoice.voiceSupport()) {
						responsiveVoice.speak("다음 음악을 재생합니다.", "Korean Female");
		}
	},

	musicprev :function(){
		console.log("prev music");
		if(responsiveVoice.voiceSupport()) {
						responsiveVoice.speak("이전 음악을 재생합니다.", "Korean Female");
		}
	},

	musicpause :function(){
		console.log("pause music");
		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("음악을 정지합니다.", "Korean Female");
		}
	},

	lightOn : function() {
		console.debug("led on...");

    	if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("등을 켭니다.","Korean Female");
        }

		/* Light on 프로세스*/
		var exec_lighton = require('child_process').exec;
		/* 커맨드 실행할 lightOn.js의 위치  */
		var cmd_path = "/home/pi/RelaySwitch/lightOn.js";
		/* 커맨드 명령*/
		var cmd_lighton = 'node '+cmd_path;

		exec_lighton(cmd_lighton, function(errror, stdout, stderr) {
			console.log('Start node lightOn.js');
		});
	},
	lightOff : function() {
		console.debug("led off...");

		if(responsiveVoice.voiceSupport()) {
            responsiveVoice.speak("등을 끕니다.","Korean Female");
        }

		/* Light off 프로세스*/
		var exec_lightoff = require('child_process').exec;
		/* 커맨드 실행할 lightOff.js의 위치  */
		var cmd_path = "/home/pi/RelaySwitch/lightOff.js";
		/* 커맨드 명령*/
		var cmd_lightoff = 'node '+cmd_path;

		exec_lightoff(cmd_lightoff, function(errror, stdout, stderr) {
			console.log('Start node lightOff.js');
		});
	}
};
