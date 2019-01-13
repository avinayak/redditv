/*jshint multistr: true */

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
var unLoopTimeOut;
// Suggestions Welcome! Please Sort Alphabetically
// Except First two. 
var channels=[
        'videos',
'funny',
'gifs',
'youtubehaiku',
'reallifedoodles',
'reactiongifs',
'me_irl',
'interestingasfuck',
'ProgrammerHumor',
'woahdude',
'shittyreactiongifs',
'food',
'Unexpected',
'nevertellmetheodds',
'oddlysatisfying',
'HighQualityGifs',
'hockey',
'combinedgifs',
'wheredidthesodago',
'MMA',
'AnimalsBeingJerks',
'cringe',
'SquaredCircle',
'guns',
'Documentaries',
'sports',
'ConfusedTravolta',
'nba',
'nonononoyes',
'educationalgifs',
'shittyrobots',
'GifRecipes',
'youdontsurf',
'history',
'StartledCats',
'holdmybeer',
'gameofthrones',
'whitepeoplegifs',
'chemicalreactiongifs',
'PS4',
'Whatcouldgowrong',
'AnimalsBeingBros',
'RocketLeague',
'UNBGBBIIVCHIDCTIICBG',
'geek',
'pokemon',
'Minecraft',
'starcitizen',
'MadeMeSmile',
'worldpolitics',
'michaelbaygifs',
'gamegrumps',
'motorcycles',
'learnprogramming',
'roosterteeth',
'GrandTheftAutoV',
'gif',
'woodworking',
'halo',
'Prematurecelebration',
'hardbodies',
'JusticePorn',
'baseball',
'h3h3productions',
'FinalFantasy',
'FlashTV',
'mechanical_gifs',
'UnexpectedThugLife',
'blackpeoplegifs',
'ChildrenFallingOver',
'Wellthatsucks',
'KerbalSpaceProgram',
'BeAmazed',
'rct',
'ContagiousLaughter',
'JonTron',
'PublicFreakout',
'blackops3',
'GirlsMirin',
'CGPGrey',
'DeepIntoYouTube',
'IdiotsFightingThings',
'Patriots',
'PenmanshipPorn',
'boop',
'babyelephantgifs',
'DadReflexes',
'WastedGifs',
'SuperShibe',
'AnimalsBeingDerps',
'CitiesSkylines',
'thalassophobia',
'pathofexile',
'ArtisanVideos',
'absolutelynotme_irl',
'battlefield_4',
'Simulated',
'Design',
'outside',
'unexpectedjihad',
'BollywoodRealism',
'indieheads',
'SlyGifs',
'astrophotography',
'fullmoviesonyoutube',
'webdev',
'brushybrushy',
'seduction',
'LivestreamFails',
'MilitaryGfys',
'nonose',
'breathinginformation',
'MachinePorn',
'androidapps',
'theocho',
'skateboarding',
'gifextra',
'sportsarefun',
'MyPeopleNeedMe',
'CHIBears',
'AdrenalinePorn',
'Rainmeter',
'woof_irl',
'Roadcam',
'ToasterRights',
'awesome',
'Nexus6P',
'ReversedRescueGIFS',
'tarantinogifs',
'physicsgifs',
'mashups',
'Birbs',
'WorldofTanks',
'TheCreatures',
'EngineeringPorn',
'seinfeldgifs',
'CatSlaps',
'LSD',
'kpop',
'babybigcatgifs',
'trexgonewild',
'boardgames',
'happycrowds',
'CatGifs',
'SelenaGomez',
'Besiege',
'CatastrophicFailure',
'HeavySeas',
'UnexpectedCena',
'linguistics',
'MonsterHunter',
'ConspiracyGrumps',
'holdmybeaker',
'foodhacks',
'noisygifs',
'StardustCrusaders',
'fuckyouimatoddler',
'Harmontown',
'PlayItAgainSam',
'RedLetterMedia',
'HadToHurt',
'parrots',
'WhatsWrongWithYourDog',
'FitAndNatural',
'kurzgesagt',
'ThatPeelingFeeling',
'babyrhinogifs',
'asmr',
'yesyesyesno',
'gamernews',
'skiing',
'randomactsofmusic',
'GTAgifs',
'BillBurr',
'holdmyredbull',
'HighwayFightSquad',
'yesyesyesyesno',
'horror',
'PeopleBeingJerks',
'scuba',
'linux_gaming',
'Fishing',
'analogygifs',
'androidthemes',
'LiaMarieJohnson',
'holdmycosmo',
'NotTimAndEric',
'Miata',
'pocketsand',
'AccidentalComedy',
'longboarding',
'GrinningGoat',
'uwotm8',
'Unity3D',
'TeamSolomid',
'edmproduction',
'SuperSaiyanGifs',
'AliensAmongUs',
'GifSound',
'SplitDepthGIFS',
'smashgifs',
'FeelsLikeTheFirstTime',
'insurgency',
'cutegirlgifs',
'mindcrack',
'Hatfilms',
'yoga',
'NBA2k',
'Boxing',
'TheSyndicateProject',
'fivenightsatfreddys',
'videogamedunkey',
'ObscureMedia',
'mealtimevideos',
'YMS',
'twinpeaks',
'SFWPornGifs',
'CompetitiveMinecraft',
'panelshow',
'Toonami',
'motogp',
'WhatsInThisThing',
'CoDCompetitive',
'Tribes',
'LeftHanging',
'nvidia',
'Gotham',
'tsunderespiders',
'nflgifs',
'Jazz',
'emulation',
'SFGiants',
'nerdcubed',
'madtekkers',
'Georgegifs',
'robotics',
'weightroom',
'SmarterEveryDay',
'homeworld',
'powerlifting',
'DnB',
'AmIFreeToGo',
'traingifs',
'randomsexygifs',
'asiangirlsbeingcute',
'Dirtybomb',
'SNSD',
'brooklynninenine',
'Haikuwoot',
'mildlysatisfying',
'SpaceGifs',
'replications',
'MouthEyes',
'contentawarescale',
'rangers',
'arewerolling',
'CelebGfys',
'HighQualityReloads',
'saplings',
'HighlightGIFS',
'Automate',
'judo',
'supermoto',
'mourinhogifs',
'K_gifs',
'Kramergifs',
'SFM',
'60fpsGamingGifs',
'AirBrawl',
'sabres',
'Robbaz',
'hockeygoalies',
'themartian',
'StackGunHeroes',
'RitaOra',
'Fictorum',
'FullMovieGifs',
'DrosteEffect',
'Unity2D',
'DebbyRyan',
'Bridgitmendler',
'penspinning',
'longbeach',
'aviationgifs',
'Curling',
'canberra',
'Gigi_Hadid',
'hdcelebgifs',
'gfycat',
'AceOfAngels8',
'pureawesomeness',
'mmagifs',
'juggling',
'AllThingsTerran',
'StarletGIFS',
'krystenritter',
'SpaceXMasterrace',
'snackman',
'BeamNG',
'contagioussmiles',
'BioshockInfinite',
'f0restGIFS',
'CelebrityArmpits',
'sm4sh',
'customsmash',
'fail',
'almostperfectloops',
'birb',
'badcompany2',
'shittydadreflexes',
'Nbamemes',
'Basketball',
'shittytechnicals',
'GanondorfMains',
'WatchAdventureTime',
'helenflanagan',
'nailedthelanding',
'suprmaryface',
'LGBTrees',
'timelapse',
'HQRG',
'PandasBeingClumsy',
'Kickboxing',
'millajovovich',
'GosuMicro',
'gamedevscreens',
'bemani',
'gamedevscreens',
'classicscreengifs',
'ShittyFifthWorldPics',
'DevilMayCry',
'ssbb',
'giffar',
'soccergifs',
'MoonbeamCity',
'mashgifs',
'LethalLeague',
'BadWinkers',
'BlackwakeGame',
'infinifactory',
'destabilized',
'NFCEast',
'EnemyTerritory',
'tiara',
'softscience',
'TaissaFarmiga',
'FastRacingNeo',
'kfeets',
'akita',
'GAA',
'SeahawksGifs',
'ps4gifs',
'mesmerizinggifs',
'Celebrityhips',
'FuckedUpCutscenes',
'TrackMania',
'20SS',
'gfycats',
'GfycatDepot',
'ATV',
'SnowTheGame',
'Derailed',
'Conor_McGregor',
'xxxvrsites',
'RandomActsOfTire',
'MichelleKeegan',
'ParkChorong',
'peyups',
'OffTheHighDive',
'SpaceGfys',
'EliteHumor',
'treesgw',
'victorydances',
'harasser',
'dmrcirclejerk',
'Knockout',
'nffc',
'Formula1Saves',
'celebgifs',
'ben',
'funny_gifs',
'SillyPornFaces',
'radarloops',
'removedreactiongifs',
'WastedGifRequests',
'KingDededeMains',
'MissileGfys',
'ksptrickshots',
'MrGameAndWatchMains',
'bunnyhopping',
'Hayoung',
'GTAV_Military',
'MonsterFishKeepers',
'pedale',
'GTAoutfits',
'reddx',
'SpeedRunners',
'CumInHair',
'bambino',
'ExileMod',
'HoleSwitching',
'CodCompCirclejerk',
'SlowMotion',
'CharizardMains',
'InfuriatingDesign',
'BigMacintosh',
'OriginTP',
'MegaManMains',
'LaughingGifs',
'shittysmashgifs',
'whatwhatwhatwhatyes',
'Creepygifs',
'peta_jensen',
'nflcoachgifs',
'accidents',
'piscsofdeadpuppies',
'ThePokemonMOBA',
'Clayster',
'nflcoachgifs',
'attiny',
'ArianaGrandeupskirt',
'IndianSuperLeague',
'FlyingWhales',
'Rose_Bertram',
'SelenaGomezLegs',
'HarrisHoffman',
'MakeYouAGif',
'thebodyvr',
'fail_gifs',
'hypixel',
'Rocket_League',
'KerrisDorsey',
'TheManyFacesOfTomlin',
'20PluckPluck',
'LeonaMains',
'ImagesOfVirginia',
'CamelHoarder101',
'rockybalboa',
'crazyBF4gifs',
'Carmel',
'HorrorGifs',
'motogif',
'DeafGifs',
'hardtrance',
'maybemaybeoriginal',
'Whiff',
'gfycatmasterrace',
'SecuriTEAM',
'RIPGlobalOffensive',
'james_irl',
'FourA',
'RocketLeagueGifs',
'Kenndogg',
'gif_to_gyf',
'ZadocPaet',
'tf2clips',
'gif_to_gyf',
'CamMemes',
'JustForUsssss',
'gif_to_gyf',
'ShittyMMA',
'badr0bot',
'hlm',
'cstimelapse',
'gif_to_gyf',
'skateboardcirclejerk',
'MIPMBGLAE',
'gif_to_gyf',
'CelebsGifs',
'RIPgaming2',
'whiteguysdancing',
'gif_to_gyf',
'Bullshido',
'TagproSimulator',
'gif_to_gyf',
'maybemaybeoriginal',
'fulltvshowsonanything',
'skeet_skeet',
'Showdog',
'RyanRyans',
'interspeciesfriends',
'fulltvshowsonanything',
'RealHQgifs',
'JCBDL',
'RealHQgifs',
'KeeganIrby',
'VATS',
'ChangeTheTheme',
'Rocket',
'HarvestTime',
'60fpsgfys',
'AnalPileDriver',
'BackgroundWarlock',
'playground',
'Reaction',
'GangplankMasterRace',
'drunkenpeople',
'SexyGirlsOfVolleyball',
'mamacats',
'ShittyFlips',
'polarbear4321',
'jacksonandterrellgifs',
'ContactImprovisation',
'RelevantGfyCatURLs',
'tonybaby',
'OhGirlIamInTrouble',
'turkgifs',
'porn_stars',
'imstraight',
'JustGamingGifs',
'birdsonracetracks',
'JustGamingGifs',
'HoustonMultirotors',
'smashreplays',
'tonybaby',
'Vuaa',
'IDTMod',
'HarryLiu',
'MarinersGifs',
'Honkyshit',
'turkgifs',
'Noatats',
'FallingDrones',
'APPlause',
'CometApp',
'kzed',
'LERFIJ',
'Jraed',
'turkgifs',
'BrigadeStrike',
'Trythiswhilehigh',
'Jamziboy',
'wehiird',
'lukefeist',
'finishhimgifs',
'Sharpie',
'FootballersSayingFOff',
'kzed',
'PhantomAssassin',
'kzed',
'wave',
'johncosta',
'stupidforstupidssake',
'matteogfysikk',
'TheRexAndMeshClub',
'aptlytitledgfycaturls',
'toofifty',
'nvrgrls',
'ReddemptionCC',
'gifswithsound',
'imstraight',
'TagProMoosen',
'CutscenesGoneWrong',
'EatDatPussy445',
'YoshihiroAkiyama',
'DOnkM0ms',
'nvrgrls',
'kzed',
'MyDadWorksForNintendo',
'realdubstepcsstest',
'gingerism',
'watchpidgeonsdie',
'HoodieGirls',
'Leggy',
'QuickPostTests',
'tonybaby',
'imstraight',
'PraiseWilo',
'sistar',
'MatchWatchTest',
'RIPnba',
'openloadz',
'jeremylin',
'RIPnfl',
'ipkm',
'BoxOfficeMovies1',
'MartialArtsVideosMMA',
'openload',
'BoxOfficeMovies1',
'mmapodcasts',
'rhinoceros',
'UKF',

];
var subreddit=channels[0];
// autoplay video
function onPlayerReady(event) {
    event.target.playVideo();
}

function videoExistsInQueue (id) {
    for (var i = 0; i < videos.length; i++) {
        if(videos[i].id==id)
            return true;
    };
    return false;
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

function onMP4Ended(e) {
    e.target.remove()
    nextVideo();
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
        try{
            if(player)
                if(player.getPlayerState()==-1)
                    nextVideo();
        }catch(e){}
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

function mp4ErrorHandler(){ 
    nextVideo();
}

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

function removeYouTubePlayer () {
    try{
        if(player)
            player.destroy();
    }catch(e){}
}

function changeChannel (_channel) {
    showLoading();
    //closeChannels();
    subreddit = _channel;
    removeYouTubePlayer()
    $("#MP4Player").remove();
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
                    if(!videoExistsInQueue(video.id))
                        videos.push(video);

                }else if(s.data.children[i].data.domain.indexOf('imgur')!=-1 ){
                    video.type="mp4";
                    video.id = s.data.children[i].data.url;
                    video.url = s.data.children[i].data.url.replace("gifv","mp4").replace("gif","mp4");
                    if(!video.url.endsWith("mp4") && video.url.split("/")[video.url.split("/").length-1].indexOf(".")==-1)
                        video.url+=".mp4";
                    video.title=s.data.children[i].data.title;
                    video.author=s.data.children[i].data.author;
                    video.score=s.data.children[i].data.score;
                    video.channel=_subreddit;
                    video.permalink=s.data.children[i].data.permalink;
                    if(!videoExistsInQueue(video.id) && video.url.endsWith("mp4"))
                        videos.push(video);

                }else if(s.data.children[i].data.domain.indexOf('gfy')!=-1 ){
                    var video={};
                    video.type="mp4";
                    video.id = s.data.children[i].data.url;
                    video.url = s.data.children[i].data.url.replace("com/","com/cajax/get/").replace("http:","https:");
                    video.title=s.data.children[i].data.title;
                    video.author=s.data.children[i].data.author;
                    video.score=s.data.children[i].data.score;
                    video.channel=_subreddit;
                    video.permalink=s.data.children[i].data.permalink;
                    if(!videoExistsInQueue(video.id))
                        videos.push(video);

                } //https://gfycat.com/EasygoingEmbellishedHypacrosaurus
                
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
    if(player.getIframe()){
        if(player.getPlayerState()==2){
            player.playVideo();
            
            $("#playbutton").addClass('ic-button fa fa-pause');
        }
        else if(player.getPlayerState()==1){
            player.pauseVideo();
            $("#playbutton").removeClass();
            $("#playbutton").addClass('ic-button fa fa-play');
        }
    }
    if(document.getElementById('MP4Player')){
        if(document.getElementById('MP4Player').paused){
            document.getElementById('MP4Player').play()
            $("#playbutton").removeClass();
            $("#playbutton").addClass('ic-button fa fa-pause');
        }
        else{
            document.getElementById('MP4Player').pause();
            $("#playbutton").removeClass();
            $("#playbutton").addClass('ic-button fa fa-play');
        }
    }
}

function pauseVideo () {
    if(player.getIframe()){
        player.pauseVideo();
        $("#playbutton").removeClass();
        $("#playbutton").addClass('ic-button fa fa-play');
    }
    if(document.getElementById('MP4Player')){
        document.getElementById('MP4Player').pause();
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

function startUnLoopingTimer(){
    
    clearTimeout(unLoopTimeOut);
    unLoopTimeOut = setTimeout(function(){
        $("#MP4Player").removeAttr("loop");
    },7000);    // inspired by Vine :)
}

function playVideo (vid_current) {
    clearTimeout(unLoopTimeOut);
    $("#info").hide();
    if(vid_current)
        lastFetchedChannel=vid_current.channel;
    $("#MP4Player").remove();
    if(vid_current.type=='youtube.com'){
          player = new YT.Player('player', {
          height: $(window).height(),
          width: $(window).width(),
          videoId: vid_current.id,
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
    }else if(vid_current.type=='mp4'){

        if(vid_current.url.indexOf("gfy")!=-1){
            $.get(vid_current.url,function(res){
                $("#player").html(`
                    <video id="MP4Player" src="${res.gfyItem.mp4Url}" autoplay loop onplay="startUnLoopingTimer()" onerror="mp4ErrorHandler()" >
                        Your browser does not support the video tag.
                    </video>`
                );
                $("#MP4Player").width($(window).width());
                $("#MP4Player").height($(window).height());
                document.getElementById('MP4Player').addEventListener('ended',onMP4Ended,false);
                showInfo(vid_current);
            })
        }else{
            $("#player").html(`
                <video id="MP4Player" src="${vid_current.url}" autoplay loop onplay="startUnLoopingTimer()" onerror="mp4ErrorHandler()">
                    Your browser does not support the video tag.
                </video>`
            );
        }
        try{
            $("#MP4Player").width($(window).width());
            $("#MP4Player").height($(window).height());
            document.getElementById('MP4Player').addEventListener('ended',onMP4Ended,false);
        }catch(e){}

    }
    showInfo(vid_current);
}
$(window).resize(function () { 
    if(player.getIframe())
        player.setSize($(window).width(),$(window).height());
    if($("#MP4Player"))
    {
        $("#MP4Player").width($(window).width());
        $("#MP4Player").height($(window).height());
    }
});

function openMediaInNewTab (id) {
    if(id.indexOf("imgur")!=-1){
        pauseVideo();
        window.open(id, "_blank");
    }else{
        if(player)
            pauseVideo();
        var time = Math.floor(player.getCurrentTime());
        if(time/60>0)
            time=Math.floor(time/60)+"m"+(time%60)+"s";
        else
            time=(time%60)+"s";
        window.open("http://www.youtube.com/watch?t="+time+"&v="+id, "_blank");
    }
}

function showInfo (video) {
    try{clearTimeout(infoShowTimeOut);}catch(e){}
    infoShowTimeOut=setTimeout(function() { $("#info").show(); },1000);
    $('#title').html(video.title);
    // <i onclick=toggleChannels() class="ic-button icon-rotate-90 icon-pushpin"></i>&nbsp&nbsp
    // un pinning ui
    $('#desc').html('<i onclick=toggleChannels() class="ic-button fa fa-tv"></i>&nbsp&nbsp\
        <i onclick=openMediaInNewTab("'+video.id+'") class="ic-button fa fa-external-link"></i>&nbsp&middot;\
        &nbsp<i onclick=previousVideo() class="ic-button fa fa-step-backward"></i>&nbsp&nbsp\
        <i onclick=togglePlay() id="playbutton" class="ic-button fa fa-pause"></i>&nbsp&nbsp\
        <i onclick=nextVideo() class="ic-button fa fa-step-forward"></i> &middot; /r/'
        +video.channel+' <i class="fa fa-arrow-up"></i> '+video.score);
    $("#infolink").attr("href", "http://www.reddit.com"+video.permalink);
}
