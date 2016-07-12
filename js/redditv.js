var player;
var vid;
var videos=[];
var current=0;
var hash;
var ui_pinned=false;
var after_id;
var chanShowTimeOut;
var infoShowTimeOut;
var lastFetchedChannel;
// Suggestions Welcome! Please Sort Alphabetically
// Except First two. 
var channels=[
        'YoutubeHaiku',
        'Videos',

        'AccidentalComedy',
        'ArtisanVideos',
        'AwfulCommercials',
        'CombatFootage',
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
        'fifthworldvideos',
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
    chanShowTimeOut = setTimeout(function() { $("#channel-name").hide(); }, 5000);
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
    $("#info").hide();
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
    // fast scrolling / long press down-up
    // to change channels handler.
    // this will run every 500ms to see if 
    // the running channels is infact the channel we wanted
    setInterval(function(){
        if(lastFetchedChannel!=subreddit){
            changeChannel(subreddit);
        }
    },500);

});

$(window).on('hashchange', function() {
    changeChannel(window.location.hash.substring(1));
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
});

function toggleChannels () {
    $("#channels").fadeToggle();
}

function closeChannels() {
    $('#channels').fadeOut();
}


function changeChannel (_channel) {
    showLoading();
    //closeChannels();
    subreddit = _channel;
    if(player)
        player.destroy();
    videos=[];
    current=0;
    after_id=null;
    fetchRedditPage(subreddit);
}



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

function fetchRedditPage (_subreddit,after) {
    changeChannelIndicator(_subreddit);
    var link='https://www.reddit.com/r/'+_subreddit+'.json?after='+after;
    $.get(link,function(s){
        for (var i = 0; i < s.data.children.length; i++) {
            try{
                var video={};
                if(s.data.children[i].data.domain.indexOf('youtu')!=-1 ){
                    video.type='youtube.com';
                    embed_code=s.data.children[i].data.media.oembed.html;
                    if(embed_code.split('embed/').length>1)
                        video.id=embed_code.split('embed/')[1].split('?')[0];
                    else
                        video.id = s.data.children[i].data.media.oembed.url.split("v=")[1];
                    video.title=s.data.children[i].data.media.oembed.title;
                    video.author=s.data.children[i].data.author;
                    video.score=s.data.children[i].data.score;
                    video.channel=_subreddit;
                    video.permalink=s.data.children[i].data.permalink;
                    videos.push(video);
                }
                
            }catch(e){
                //TODO: help! i need more video embed support!
                //I think Vines should be easy
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

// This function checks if the specified event is supported by the browser.
// Source: http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
function isEventSupported(eventName) {
    var el = document.createElement('div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
}

$(document).ready(function() {
    // Check which wheel event is supported. Don't use both as it would fire each event 
    // in browsers where both events are supported.
    var wheelEvent = isEventSupported('mousewheel') ? 'mousewheel' : 'wheel';

    // Now bind the event to the desired element
    $('#veil').on(wheelEvent, function(e) {
        var oEvent = e.originalEvent,
            delta  = oEvent.deltaY || oEvent.wheelDelta;

        // deltaY for wheel event
        // wheelData for mousewheel event

        if (delta > 0) {
            channelDown();
        } else {
            channelUp();
        }
    });
});

function playVideo (video) {
    $("#info").hide();
    lastFetchedChannel=video.channel;
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
    showInfo(video);
}

function showInfo (video) {
    try{clearTimeout(infoShowTimeOut);}catch(e){}
    infoShowTimeOut=setTimeout(function() { $("#info").fadeIn(); },1000)
    $('#title').text(video.title);
    // <i onclick=toggleChannels() class="ic-button icon-rotate-90 icon-pushpin"></i>&nbsp&nbsp
    // un pinning ui
    $('#desc').html('<i onclick=toggleChannels() class="ic-button fa fa-tv"></i>&nbsp&middot;&nbsp<i onclick=previousVideo() class="ic-button   fa fa-step-backward"></i>&nbsp&nbsp<i onclick=togglePlay() id="playbutton" class="ic-button fa fa-pause"></i>&nbsp&nbsp<i onclick=nextVideo() class="ic-button fa fa-step-forward"></i> &middot; /r/'+video.channel+" &middot; /u/"+video.author+' &middot; <i class="fa fa-arrow-up"></i> '+video.score);
    $("#infolink").attr("href", "http://www.reddit.com"+video.permalink);
}