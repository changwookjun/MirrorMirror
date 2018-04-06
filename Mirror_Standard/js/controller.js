(function(angular) {
    'use strict';

    function MirrorCtrl(
            AnnyangService,
            GeolocationService,
            WeatherService,
            MapService,
            CalendarService,
            TrafficService,
            SubwayService,
            YoutubeService,
            SoundCloudService,
            $scope, $timeout, $interval, $sce) {

        var _this = this;
        var command = COMMANDS.ko;
        var functionService = FUNCTIONSERVICE;
        var DEFAULT_COMMAND_TEXT = command.default;
        var PHOTO_INDEX=0;
        var VIDEO_INDEX=0;
        $scope.isPlaying = false;
        $scope.listening = false;
        $scope.musicType = "default";
        $scope.complement = command.hi;
        $scope.debug = false;
        $scope.focus = "default";
        $scope.greetingHidden = "true";
        $scope.user = {};
        $scope.interimResult = DEFAULT_COMMAND_TEXT;

        /** Smart Mirror IP */
        var os = require('os');
        var networkInterfaces = os.networkInterfaces();
        $scope.ipAddress = networkInterfaces.wlan0[0].address;

        // music player info
        var player = new Audio('');



        /** Sound Cloud Service */
        /*
        SC.initialize({
        	client_id : config.soundcloud.key
        });

        $scope.musicplay = null;
        SC.stream('/tracks/1').then(function(player){
        	$scope.musicplay = player
        	//player.play();
        });
        */

        // Update the time
        function updateTime(){
            $scope.date = new Date();
        }

        // Reset the command text
        var restCommand = function(){
          $scope.interimResult = DEFAULT_COMMAND_TEXT;
        }

        _this.init = function() {
		        var player = new Audio('');

        	   $scope.map = MapService.generateMap("Seoul, Korea");
             var tick = $interval(updateTime, 1000); // 1초 마다
             updateTime();

            /** GPS 정보를 가져온다 */
            GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
                console.log("Geoposition", geoposition);
                $scope.map = MapService.generateMap(geoposition.coords.latitude+','+geoposition.coords.longitude);
            });
            restCommand();

            //Initialize SoundCloud
            var playing = false, sound;
            //SoundCloudService.init();

            /** 현재 장소를 가져오며, 날씨 정보를 가져온다. */
            var refreshMirrorData = function() {
                //Get our location and then get the weather for our location
                GeolocationService.getLocation({enableHighAccuracy: true}).then(function(geoposition){
                    console.log("Geoposition", geoposition);
                    WeatherService.init(geoposition).then(function() {
                        $scope.currentForcast = WeatherService.currentForcast();
                        $scope.weeklyForcast = WeatherService.weeklyForcast();
                        $scope.hourlyForcast = WeatherService.hourlyForcast();
                        console.log("Current", $scope.currentForcast);
                        console.log("Weekly", $scope.weeklyForcast);
                        console.log("Hourly", $scope.hourlyForcast);
                    });
                }, function(error){
                    console.log(error);
                });

                /** icals로 연동된 달력의 정보를 가져온다. */
                CalendarService.getCalendarEvents().then(function(response) {
                    $scope.calendar = CalendarService.getFutureEvents();
                }, function(error) {
                    console.log(error);
                });

                /** config.js의 greeting 배열(인사말의 정보)를 랜덤으로 가져온다 */
                $scope.greeting = config.greeting[Math.floor(Math.random() * config.greeting.length)];
            };

            refreshMirrorData();
            $interval(refreshMirrorData, 3600000);

            /** 출근에서 퇴근지 교통 정보 나오기*/
            var refreshTrafficData = function() {
                TrafficService.getTravelDuration().then(function(durationTraffic) {
                    console.log("Traffic", durationTraffic);
                    $scope.traffic = {
                        name:config.traffic.name,
                        origin: config.traffic.origin,
                        destination : config.traffic.destination,
                        hours : durationTraffic.hours(),
                        minutes : durationTraffic.minutes()
                    };
                }, function(error){
                    $scope.traffic = {error: error};
                });
            };


            refreshTrafficData();
            $interval(refreshTrafficData, config.traffic.reload_interval * 60000);

            /* Default뷰는 홈 화면*/
            var defaultView = function() {
            	functionService.defaultHome($scope);
            }

            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_2,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_3,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_4,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_5,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_6,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_7,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_8,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });
            // 거울아 거울아 세상에서 누가 제일 이쁘니
            AnnyangService.addCommand(command.mirror_9,function() {
				console.debug("MirrorCtrl!!! Ok, I am Mirror");
            	functionService.mirror($scope);
            });

            // 미러는 누구니
            AnnyangService.addCommand(command.whois,function() {
            	functionService.whoIsSmartMirror($scope);
            });

            // 사용가능한 명령을 보여준다.
            AnnyangService.addCommand(command.whatcanisay, function() {
               functionService.whatCanISay($scope);
            });

            // 홈화면으로
            AnnyangService.addCommand(command.home, defaultView);

			// 미러의 화면을 ON
            AnnyangService.addCommand(command.hi, function() {
            	functionService.hi($scope);
            });
            // 미러의 화면을 OFF.
            AnnyangService.addCommand(command.sleep, function() {
            	functionService.goSleep($scope);
            });

            // Wake Up Mirror && Face Detection.
            AnnyangService.addCommand(command.wake, function() {
            	functionService.wake($scope);
            });

            // 디버그의 정보를 보여준다.
            AnnyangService.addCommand(command.debug, function() {
                console.debug("Boop Boop. Showing debug info...");
                $scope.debug = true;
            });

            // 현재 위치의 지도를 보여준다.
            AnnyangService.addCommand(command.map, function() {
                functionService.map($scope,GeolocationService,MapService);
             });

            // 특정 위치의 지도를 보여준다.
            AnnyangService.addCommand(command.locaiton, function(location) {
            	console.debug("Getting map of", location);
                $scope.map = MapService.generateMap(location);
                $scope.focus = "map";
            });

            // 지도를 확대한다.
            AnnyangService.addCommand(command.zoomin, function() {
                console.debug("Zoooooooom!!!");
                $scope.map = MapService.zoomIn();
            });

            // 지도를 축소한다.
            AnnyangService.addCommand(command.zoomout, function() {
                console.debug("Moooooooooz!!!");
                $scope.map = MapService.zoomOut();
            });

            // 지도의 줌 값을 정한다.
            AnnyangService.addCommand(command.zoomvalue, function(value) {
                console.debug("Moooop!!!", value);
                $scope.map = MapService.zoomTo(value);
            });

            // 지도의 줌 값을 리셋 한다.
            AnnyangService.addCommand(command.zoomreset, function() {
                console.debug("Zoooommmmmzzz00000!!!");
                $scope.map = MapService.reset();
                $scope.focus = "map";
            });


            /** Youtube API */
            // Youtube 동영상 재생
            AnnyangService.addCommand(command.playyoutube, function(term) {
              YoutubeService.getYoutube(term,'video').then(function(){
                if(term){
                  var videoId = YoutubeService.getVideoId()
                  $scope.focus = "youtube";
                  $scope.youtubeurl = "http://www.youtube.com/embed/" + videoId + "?autoplay=1&enablejsapi=1&version=3&playerapiid=ytplayer"
                  $scope.currentYoutubeUrl = $sce.trustAsResourceUrl($scope.youtubeurl);
                }
              });
            });

            // Youtube 플레이어 리스트 재생
            AnnyangService.addCommand(command.ytbplaylist, function(term) {
              YoutubeService.getYoutube(term,'playlist').then(function(){
                if(term){
                  var playlistId = YoutubeService.getPlaylistId()
                  $scope.focus = "youtube";
                  $scope.youtubeurl = "http://www.youtube.com/embed?autoplay=1&listType=playlist&enablejsapi=1&version=3&list="+playlistId
                  $scope.currentYoutubeUrl = $sce.trustAsResourceUrl($scope.youtubeurl);
                }
              });
            });

            // Youtube 동영상, 플레이어 리스트 정지
            AnnyangService.addCommand(command.stopyoutube, function() {
              var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
              iframe.postMessage('{"event":"command","func":"' + 'stopVideo' +   '","args":""}', '*');
              $scope.focus = "commands";
            });

            /** Subway */
            // 지하철 도착 정보
            AnnyangService.addCommand(command.subway, function(station,linenumber,updown) {
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
                    $scope.subwayinfo = "운행하는 열차가 존재 하지 않습니다.";
                  }
                  $scope.focus = "subway";
                });
              });
            });

            /** Google News */
            // 구글 뉴스를 보여준다.
            AnnyangService.addCommand(command.news, function() {
            	functionService.news($scope);
            });
            /** Raspberry Camera */
            // 라즈베리 카메라를 이용해 사진 촬영
            AnnyangService.addCommand(command.photo, function() {
            	functionService.photo(PHOTO_INDEX);
            	PHOTO_INDEX++;
            });

            // video 촬영
            AnnyangService.addCommand(command.video, function() {
            	functionService.video(VIDEO_INDEX);
        		  VIDEO_INDEX++;
            });

            /** Relay Switch control Light */
            /* npm install onoff */

            // 릴레이 스위치 ON -> Light on
            AnnyangService.addCommand(command.lighton,function(state,action) {
            	functionService.lightOn();
            });

            // 릴레이 스위치 OFF -> Light off
            AnnyangService.addCommand(command.lightoff,function() {
            	functionService.lightOff();
            });

            var track_name = [ "track_1.mp3", "track_2.mp3", "track_3.mp3", "track_4.mp3"
                              , "track_5.mp3", "track_6.mp3", "track_7.mp3", "track_8.mp3"
                              , "track_9.mp3", "track_10.mp3", "track_11.mp3", "track_12.mp3", "track_13.mp3"
                              , "track_14.mp3", "track_15.mp3", "track_16.mp3", "track_17.mp3", "track_18.mp3"
                              , "track_19.mp3", "track_20.mp3", "track_21.mp3", "track_22.mp3", "track_23.mp3",];
            var track_time = [222000, 138000, 139000, 243000
                            , 195000, 167000, 229000, 231000
                            ,201000, 214000, 244000, 239000, 211000
                            , 219000, 249000, 217000, 205000, 214000
                            , 188000, 165000, 221000, 283000, 369000];
            var musicCommandTimeout;
            var music_url;
            var music_cur = 0;
            var MAX_MUSIC_COUNT = 23;

            var musicSeqPlay = function() {

              if($scope.isPlaying) {
                  if(music_cur > MAX_MUSIC_COUNT) {
                    music_cur = 0;
                    console.log("Func musicSeqPlay, music_cur max! initialize = " + music_cur);
                  }

                  console.log("Func musicSeqPlay, music_cur = " + music_cur);
                  music_url = './music/' + track_name[music_cur];

                  if(window.HTMLAudioElement) {
                      if(player.paused || music_url != player.src) {
                          if(player.canPlayType('audio/mp3')) {
                            console.log("canPlayType");
                            player.src = music_url;
                          }
                      }
                      console.log("player.play");
                      player.play();
                      /** Timer Cancel */
                      if(typeof musicCommandTimeout != "undefined") {
                          $timeout.cancel(musicCommandTimeout);
                      }
                      musicCommandTimeout = $timeout(musicSeqPlay, track_time[music_cur]);

                      if(music_cur == MAX_MUSIC_COUNT) {
          						        music_cur = 0;
          					  } else {
          						        music_cur++;
          					  }

                      /*
                      if($scope.musicType == "default" || $scope.musicType == "next") {
                        music_cur++;
                      } else if($scope.musicType == "prev") {
                        music_cur--;
                      }*/

                  }
                }
            }

            var musicStop = function() {
				    $scope.isPlaying = false;

      				console.log("player.pause");
      				player.pause();
      				/** Timer Cancel */
                    if(typeof musicCommandTimeout != "undefined") {
                          $timeout.cancel(musicCommandTimeout);
                          musicCommandTimeout = null;
                    }
			        }

            var musicPrevPlay = function() {
				    if($scope.isPlaying) {
					         if(music_cur == 1) {
						               music_cur = MAX_MUSIC_COUNT;
					         } else {
						               music_cur = music_cur - 2;
					         }

					console.log("musicprev, music_cur = " + music_cur);

					music_url = './music/' + track_name[music_cur];

					if(window.HTMLAudioElement) {
						if(player.paused || music_url != player.src) {
							if(player.canPlayType('audio/mp3')) {
							console.log("canPlayType");
							player.src = music_url;
							}
						}
						console.log("player.play");
						player.play();
			                        /** Timer Cancel */
			                        if(typeof musicCommandTimeout != "undefined") {
			                            $timeout.cancel(musicCommandTimeout);
			                        }
						musicCommandTimeout = $timeout(musicSeqPlay, track_time[music_cur]);
						music_cur++;
					}
				}
			}

            var musicNextPlay = function() {
				if($scope.isPlaying) {

					console.log("musicnext, music_cur = " + music_cur);
					music_url = './music/' + track_name[music_cur];

					if(window.HTMLAudioElement) {
						if(player.paused || music_url != player.src) {
							if(player.canPlayType('audio/mp3')) {
								console.log("canPlayType");
								player.src = music_url;
							}
						}
						console.log("player.play");
						player.play();
			                        /** Timer Cancel */
			                        if(typeof musicCommandTimeout != "undefined") {
			                            $timeout.cancel(musicCommandTimeout);
			                        }
						musicCommandTimeout = $timeout(musicSeqPlay, track_time[music_cur]);
						music_cur++;
					}
				}
			}

            /** Sound Cloud */
            // 음악 재생

            AnnyangService.addCommand(command.musicplay,function() {
            	console.log("음악 재생");
            	functionService.musicplay();

            	$scope.isPlaying = true;
				musicSeqPlay();

            	/* soundcloud source
            	$scope.musicplay.play(); // 음악 재생
		        functionService.musicplay();

              SoundCloudService.searchSoundCloud(query).then(function(response){
                console.log("## Call SoundCloudService.searchSoundCloud");

                if (response[0].artwork_url){
                    $scope.scThumb = response[0].artwork_url.replace("-large.", "-t500x500.");
                } else {
                    $scope.scThumb = 'http://i.imgur.com/8Jqd33w.jpg?1';
                }
                $scope.scWaveform = response[0].waveform_url;
                $scope.scTrack = response[0].title;
                $scope.focus = "sc";
                SoundCloudService.play();
              });
              */

            });

            // 음악정지 state,action
            AnnyangService.addCommand(command.musicstop,function() {
            	console.log("음악 정지");
      				functionService.musicpause();
					musicStop();

            	/*
            	$scope.musicplay.pause(); // 음악 정지
                console.log("## Call SoundCloudService.pause");
                SoundCloudService.pause();
                $scope.focus = "default";
                */
            });

            // 이전 재생
            AnnyangService.addCommand(command.musicprev,function() {
            	console.log("이전 재생");
      			musicPrevPlay();
            });

            // 다음 재생
            AnnyangService.addCommand(command.musicnext,function() {
            	console.log("다음 재생");
				musicNextPlay();
            });

            /** 안드로이드에서 보낸 SST 명령어를 미러와 동작하게 하는 부분*/
            var sender = require('remote').getGlobal('sender');
     	        sender.on('android',function(android){
     	    	     $scope.interimResult = android.command; // 미러의 음성인식된 문구에 보여짐
	    		       console.log("Android Command :: "+android.command);
	    		       var androidCommand = android.command+"";

    			if(androidCommand === command.sleep) { functionService.goSleep($scope);}
          else if(androidCommand === command.hi) { functionService.hi($scope); }
          else if(androidCommand === command.mirror) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_2) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_3) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_4) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_5) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_6) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_7) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_8) { functionService.mirror($scope); }
          else if(androidCommand === command.mirror_9) { functionService.mirror($scope); }
    			else if(androidCommand === command.whois) { functionService.whoIsSmartMirror($scope); }
    			else if(androidCommand === command.home) { functionService.defaultHome($scope); }
    			else if(androidCommand === command.wake) { functionService.wake($scope); }
    			else if(androidCommand === command.whatcanisay) { functionService.whatCanISay($scope); }
    			else if(androidCommand === command.map) { functionService.map($scope,GeolocationService,MapService); }
    			else if(androidCommand === command.news) { functionService.news($scope); }
    			else if(androidCommand === command.photo) { functionService.photo(); }
    			else if(androidCommand === command.video) { functionService.video(); }
    			else if(androidCommand === command.lighton) { functionService.lightOn();}
    			else if(androidCommand === command.lightoff) { functionService.lightOff();}
    			else if(androidCommand === command.musicplay) {
					console.log("음악 재생");
					functionService.musicplay();
					$scope.isPlaying = true;
					musicSeqPlay();
				}
    			else if(androidCommand === command.musicstop) {
					console.log("음악 정지");
					functionService.musicpause();
      				 musicStop();
				}
    			else if(androidCommand === command.musicprev) { musicPrevPlay();}
    			else if(androidCommand === command.musicnext) { musicNextPlay();}
    			else if(androidCommand === command.zoomin) {
					console.debug("Zoooooooom!!!");
					$scope.map = MapService.zoomIn();
				}
				else if(androidCommand === command.zoomout) {
					console.debug("Moooooooooz!!!");
					$scope.map = MapService.zoomOut();
				}

    			/* Map Service ***의 위치 보여줘 */
    			var locationExist = androidCommand.indexOf("위치");
	    		if(locationExist != -1) {
	    			var locationValue = androidCommand.split("위치");
	    			console.log(locationValue[0]);
	    			functionService.location(locationValue[0],$scope,GeolocationService,MapService);
	    		}

	    		/*var zoomoutExist = androidCommand.indexOf("축소");
	    		if(zoomoutExist != -1) {
	    			console.debug("Moooooooooz!!!");
					$scope.map = MapService.zoomOut();
	    		}*/

	    		/* Youtube *** 동영상 보여줘 */
	    		var youtubeExist = androidCommand.indexOf("동영상");
	    		if(youtubeExist != -1) {
	    			if(androidCommand === "동영상 정지") {
	    				functionService.stopYoutube($scope);
	    			}else {
		    			var youtubeValue = androidCommand.split("동영상");
		    			console.log(youtubeValue[0]);
		    			functionService.playYoutube(youtubeValue[0],$scope,$sce,YoutubeService);
	    			}
     	    	}

	    		/* 지하철 **역 *호선 *행성 */
	    		var subwayExist = androidCommand.indexOf("역");
	    		if(subwayExist != -1) {
	    			// OO역 OO호선 상(하)행선
	    			var temp1 = androidCommand.split("역");
	    			var temp2 = temp1[1].split("호선");

	    			var subwayStation = temp1[0];
	    			var subwayLineNumber = temp2[0].trim();
	    			var subwayUpDown = temp2[1].trim();
	    			console.log(subwayStation+"역"+subwayLineNumber+"호선"+subwayUpDown);
	    			functionService.subway(subwayStation,subwayLineNumber,subwayUpDown,$scope,SubwayService);
	    		}


    	    });


            var resetCommandTimeout;
            //Track when the Annyang is listening to us
            AnnyangService.start(function(listening){
                $scope.listening = listening;
            }, function(interimResult){
                $scope.interimResult = interimResult;
                $timeout.cancel(resetCommandTimeout);
            }, function(result){
                $scope.interimResult = result[0];
                resetCommandTimeout = $timeout(restCommand, 5000);
            });

            $scope.interimResult = DEFAULT_COMMAND_TEXT; // 미러의 음성인식된 문구에 보여짐
        };

        _this.init();
    }

    angular.module('SmartMirror')
        .controller('MirrorCtrl', MirrorCtrl);

}(window.angular));
