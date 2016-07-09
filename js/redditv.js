 var player;
            var vid;
            var videos=[];
            var current=0;
            var hash;
            var ui_pinned=false;
            var after_id;
            var chanShowTimeOut;
            // Suggestions Welcome! Please Sort Alphabetically
            // Except First two. 
            var channels=[
                    'YoutubeHaiku',
                    'Videos',

                    'AccidentalComedy',
                    'ArtisanVideos',
                    'AwfulCommercials',
                    'CommercialCuts',
                    'ContagiousLaughter',
                    'ConTalks',
                    'CookingVideos',
                    'Cringe',
                    'CuriousVideos',
                    'DeepIntoYouTube',
                    'Documentaries',
                    'EducativeVideos',
                    'FastWorkers',
                    'FightPorn',
                    'FuckingWithNature',
                    'HappyCrowds',
                    'IdiotsFightingThings',
                    'InterdimensionalCable',
                    'Lectures',
                    'MealtimeVideos',
                    'MotivationVideos',
                    'Music',
                    'ObscureMedia',
                    'Playitagainsam',
                    'PrematureCelebration',
                    'PublicFreakout',
                    'RoadCam',
                    'StandUpComedy',
                    'StreetFights',
                    'SweetJustice',
                    'TheWayWeWereOnVideo',
                    'Trailers',
                    'UnexpectedThugLife',
                    'VideoPorn',
                    'Vids',
                    'Virtualfreakout',
                    'WoahTube',
            ];
            var subreddit=channels[0];
            // autoplay video
            function onPlayerReady(event) {
                event.target.playVideo();
            }

            function showChannelName () {
                try{clearTimeout(chanShowTimeOut);}catch(e){}
                $("#channel-name").hide();
                $("#channel-name").text("/r/"+window.location.hash.substring(1));
                $("#channel-name").show();
                chanShowTimeOut = setTimeout(function() { $("#channel-name").hide() }, 2000);
            }

            function togglePin () {                
                ui_pinned=!ui_pinned;
            }

            // when video ends
            function onPlayerStateChange(event) {        
                if(event.data === 0) {        
                    nextVideo();
                }
            }

            function nextVideo () {
                try{
                    player.destroy(); 
                }catch(e){}
                showLoading();                
                playVideo(videos[current]);
                current+=1;
                if(current>videos.length-1){
                    fetchRedditPage (subreddit,after_id);
                }
            }

            function showLoading () {
                $('#title').html(''); //<i class="fa fa-spinner fa-pulse fa-fw"></i>
                $('#desc').html('');
            }

            function previousVideo () {
                if(current>0){
                    try{
                        player.destroy(); 
                    }catch(e){}
                    $('#title').html('');//<i class="fa fa-spinner fa-pulse fa-fw"></i>
                    $('#desc').html("");
                    current-=1;
                    playVideo(videos[current]);
                    if(current>videos.length-1){
                        fetchRedditPage (subreddit,after_id);
                    }
                }
            }

            $(document).ready(function() {
                showLoading();
                for (var i = 0; i < channels.length; i++) {
                    $('#channels-list').html($('#channels-list').html()+'<div><a id="'+channels[i]+'-button" class="channel-button" href="#'+channels[i]+'">r/'+channels[i]+'</a></div>');
                }

                hash = window.location.hash.substring(1);
                if(!hash)
                    window.location.hash=subreddit;
                else{
                    subreddit=hash;
                    fetchRedditPage(subreddit);
                }
                showChannelName();

                // prevent missing videos from stopping
                // auto playback
                setInterval(function(){
                    if(player)
                        if(player.getPlayerState()==-1)
                            nextVideo();
                },10000);

            });

            function toggleChannels () {
                $("#channels").fadeToggle();
            }

            function closeChannels() {
                $('#channels').fadeOut();
            }

            $(window).on('hashchange', function() {
                showLoading();
                //closeChannels();
                subreddit = window.location.hash.substring(1);
                if(player)
                    player.destroy();
                videos=[];
                current=0;
                after_id=null;
                fetchRedditPage(subreddit);
                
            });

            $(window).keydown(function (e) {
              if (e.keyCode === 39) {
                e.preventDefault();
                nextVideo();
              }else if (e.keyCode === 37) {
                e.preventDefault();
                previousVideo();
              }else if (e.keyCode === 99|| e.keyCode === 67) {
                e.preventDefault();
                toggleChannels();
              }else if (e.keyCode === 27) {
                e.preventDefault();
                closeChannels();
              }else if (e.keyCode === 38) {
                e.preventDefault();
                channelUp();
              }else if (e.keyCode === 40) {
                e.preventDefault();
                channelDown();
              }else if (e.keyCode === 32 || e.keyCode === 75|| e.keyCode === 107) {
                e.preventDefault();
                togglePlay();
              }
            })

            function channelUp () {
                chnum = channels.indexOf(subreddit);
                chnum-=1;
                if(chnum>=0){
                    window.location.hash=channels[chnum];
                    changeChannelIndicator(channels[chnum]);
                }
                showChannelName ();
            }

            function channelDown () {
                chnum = channels.indexOf(subreddit);
                chnum+=1;
                if(chnum<channels.length){
                    window.location.hash=channels[chnum];
                    changeChannelIndicator(channels[chnum]);
                }
                showChannelName ();
            }

            function changeChannelIndicator (ch) {
                $(".channel-button").removeClass('selected-channel');
                $("#"+ch+"-button").addClass('selected-channel');
            }
            
            function fetchRedditPage (subreddit,after) {
                changeChannelIndicator(subreddit);
                var link='https://www.reddit.com/r/'+subreddit+'.json?after='+after;
                $.get(link,function(s){
                    for (var i = 0; i < s.data.children.length; i++) {
                        try{
                            var video={};
                            if(s.data.children[i].data.domain==='youtube.com'){
                                video.type='youtube.com';
                                video.id=s.data.children[i].data.media.oembed.html.split('embed/')[1].split('?')[0];
                                video.title=s.data.children[i].data.media.oembed.title;
                                video.author=s.data.children[i].data.author;
                                video.score=s.data.children[i].data.score;
                                video.permalink=s.data.children[i].data.permalink;
                                videos.push(video);
                            }
                            
                        }catch(e){
                            //TODO: help! i need more video embed support!
                            console.log(e,'Currently not supported: ',s.data.children[i]);  
                        }
                    }
                    if(!after_id){
                        playVideo(videos[current]);
                        current+=1;
                    }
                    after_id=s.data.after;
                });
            }

            function togglePlay () {
                if(player.getPlayerState()==2){
                    player.playVideo();
                    $("#playbutton").removeClass();
                    $("#playbutton").addClass('ic-button fa fa-pause');
                }
                else if(player.getPlayerState()==1){
                    player.pauseVideo();
                    $("#playbutton").removeClass();
                    $("#playbutton").addClass('ic-button fa fa-play');
                }

            }
            
            function playVideo (video) {
                  player = new YT.Player('player', {
                  height: $(window).height(),
                  width: $(window).width(),
                  videoId: video.id,
                  playerVars: { 
                         'controls': 0, 
                         'rel' : 0,
                         'showinfo':0,
                         'iv_load_policy':3,
                         'autoplay': 1,
                  },
                  events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                  }
                });
                $('#title').text(video.title);
                // <i onclick=toggleChannels() class="ic-button icon-rotate-90 icon-pushpin"></i>&nbsp&nbsp
                // un pinning ui
                $('#desc').html('<i onclick=toggleChannels() class="ic-button fa fa-tv"></i>&nbsp&middot;&nbsp<i onclick=previousVideo() class="ic-button   fa fa-step-backward"></i>&nbsp&nbsp<i onclick=togglePlay() id="playbutton" class="ic-button fa fa-pause"></i>&nbsp&nbsp<i onclick=nextVideo() class="ic-button fa fa-step-forward"></i> &middot; /r/'+subreddit+" &middot; /u/"+video.author+' &middot; <i class="fa fa-arrow-up"></i> '+video.score);
                $("#infolink").attr("href", "http://www.reddit.com"+video.permalink);
            }