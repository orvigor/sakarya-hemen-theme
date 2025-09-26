var windowidth = document.documentElement.clientWidth; 
var urunDetay_varyasyonSecili = true; 
var urunDuzeniTipi = 0; 
var urunDetayZoomCozunurluk = 769; 
var isHoverCartProduct = false; 
var sliderZoomCozunurluk = 769; 
var mobilBlokCozunurluk = 769; 
var kategoriMenuAcikGetir = true; 


$(document).ready(function () {
    if($('.cariOdemeContainer').length > 0){
        $('.navigation .navUl').wrapAll('<div></div>');
    }
    if ($(".categoryContainer").length > 0) { KategoriIslemleri(); }
    else if ($(".ProductDetailMain").length > 0) { UrunDetayIslemleri(); var stokSayisi = productDetailModel.totalStockAmount; if (stokSayisi < 1) {$('.RightDetail').addClass('StokYok');} }
    else if (globalModel.pageType == 'cart' || globalModel.pageType == 'ordercomplete' || globalModel.pageType == 'payment' || globalModel.pageType == 'ordercompleted') { SepetEkrani(); }
    if ($('.homeContainer').length > 0) {$('body').addClass('HomeBody');}
    if ($('.userDivRow').length > 0)    {$('body').addClass('UyeGiris');}
    if ($('.pageContainer').length > 0) {$('body').addClass('SayfaIcerik');}
    if ($('.magazalarContent').length > 0) {$('body').addClass('Magazalar');}
    if ($('.markaContainer').length > 0) {$('body').addClass('MarkaPage');}
    if ($(".HomeBody").length > 0) { AnasayfaIslemleri(); }
    $('head').append('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>');

    if (siteSettings.isAuthenticated == false) {
        $('.welcome').addClass('NotEntry');
    }
    if (siteSettings.isAuthenticated == true) {
        $('.welcome').addClass('LoginEntry');
    }
    GlobalIslemler();
    setTimeout(function(){
        if (windowidth<768){
            $('#btnKelimeAra').val('');
        }
    },1000)
});
$(window).on('load',function() {
    urunKartCallBack();
    if ($(".hesabimBolumuTutucu").length > 0) { HesabimTakip(); }
    if ($(".iletisimContent").length > 0) { Iletisimaspx(); }
});
function GlobalIslemler() {
    if (!pageInitialized) {
        if (windowidth>767){
            $('.mycart').insertBefore('.welcome');
            $('.htop').insertBefore('.headerContent');
            $('.navigation').insertAfter('.headerContent');
            $('.hfav').insertAfter('.welcome');
        }
        $('#divNewsLetter').prependTo('.ebultenGelecek');
    }
    sayfaTasarim();
    $('#instaStories').insertAfter('.hfav');

}

function sayfaTasarim() {
 if ($('#mainHolder_divDesign').length>0) {
    urunKartCallBack();
}
}

function urunKartCallBack() {
    $( ".productItem").each(function( index ) {
        if ($(this).find('.productFaMyEx').length==0) {$(this).append('<div class="productFaMyEx"></div>');}  
        $('.productItem').eq(index).find('.newIcon').appendTo('.productItem:eq('+index+') .productFaMyEx');  
        $('.productItem').eq(index).find('.discountIcon').appendTo('.productItem:eq('+index+') .productFaMyEx');
        $('.productItem').eq(index).find('.firsatIcon').appendTo('.productItem:eq('+index+') .productFaMyEx');
    });
    $(".productPrice").find(".regularPrice").parent().addClass("IndirimVar");
    $(".productItem").find(".TukendiIco").parent().addClass("StokYok");
    $(".productItem").find(".productTimer").parent().addClass("Sayacli");
    $(".productItem").find("video").parent().addClass("Videolu");
    $(".sliderBannerContainer .productItem").find("video").parent().addClass("Videolu");
    $(".sliderBannerContainer .productItem").find("video").closest('.sliderBannerContainer').addClass("CanliModa");
}

var mobFtrScrollCtrl = false;
function mobilFooter(){
    window.blockMenuHeaderScroll = false; $(window).on('touchstart', function(e) {if ($(e.target).closest('.owl-grab').length == 1) {blockMenuHeaderScroll = true;}}); $(window).on('touchend', function() {blockMenuHeaderScroll = false;}); $(window).on('touchmove', function(e) {if (blockMenuHeaderScroll) {e.preventDefault();}}); 
    if (windowidth<768 && !mobFtrScrollCtrl) {
        $('.FooterBottom').insertBefore('.FooterMiddle');
        $('.FooterMiddle .ticiContainer > ul > li > span').append('<div class="ackapabtn"><i class="fal fa-plus"></i></div>');
        $('.FooterMiddle .ticiContainer > ul > li > span').on('click',function() {
            if ($(this).find('.fal').hasClass('fa-plus')) {
                $('.FooterMiddle .ticiContainer > ul > li').find('> ul').slideUp('fast');
                $('.FooterMiddle .ticiContainer > ul > li .ackapabtn').html('<i class="fal fa-plus"></i>');
                $(this).closest('li').find('>ul').slideDown('fast');
                $(this).closest('li').find('.ackapabtn').html('<i class="fal fa-minus"></i>');
            }else {
                $(this).find('.ackapabtn').html('<i class="fal fa-plus"></i>');
                $(this).closest('li').find('> ul').slideUp('fast');
            }
        });
        mobFtrScrollCtrl = true;
    }
}
$(window).on("scroll", function() {
    mobilFooter();
});

function AnasayfaIslemleri(){
    $('#pnlSlider,#divSliderYani').wrapAll('<div class="slideralan"><div class="ticiContainer"></div></div>');
    $('.SliderYan').appendTo('#divSliderYani');
    anasayfaTab();
}
function KategoriIslemleri() {
    $("body").addClass("CategoryBody");
    $('.categoryTitle .categoryTitleText').insertBefore('#divIcerik');
    $('.FiyatSlider').parent().addClass('div-fiyatslider');
    if (windowidth > 1024) {$('body').on('click','.leftBlock .category-vertical-filters .panel .panel-heading',function(event) {$(this).parent().find('.list-group,.FiyatSlider,.FiyatTextBox').slideToggle(); $(this).toggleClass('active'); }); }
}
function UrunDetayIslemleri() {
    $("body").addClass("ProductBody");
    if (!pageInitialized) {
        
        $('#divOnyazi').insertAfter('.ProductName');
        $('#divEkstraBilgiler').insertAfter('.ProductName');
        $('#divIndirimOrani').insertAfter('.ProductName');
        $('#divParaPuan').insertAfter('.ProductName');
        $('#divToplamStokAdedi').insertAfter('.ProductName');
        $('#divUrunStokAdedi').insertAfter('.ProductName');
        $('#divTedarikci').insertAfter('.ProductName');
        $('#divBarkod').insertAfter('.ProductName');
        $('.puanVer').insertAfter('.ProductName');
        $('#divUrunKodu').insertAfter('.ProductName');
        $('#divMarka').insertAfter('.ProductName');
        $('#divTahminiTeslimatSuresi').insertAfter('.ProductName');
        
        $('.riSingle .riUp').html('<i class="far fa-plus"></i>');
        $('.riSingle .riDown').html('<i class="far fa-minus"></i>');
        $('#divKombinSatinAl').insertAfter('.BasketBtn');
        $('.buyfast').insertAfter('.basketBtn');
        $('#divAdetCombo').insertBefore('.basketBtn');
        $('#divTaksitAciklama').insertAfter('#pnlFiyatlar');    
        $('.UWhatsApp').insertAfter('.product_social_icon_wrapper li:last-child');
        $('#divMagazaStok').insertAfter('#divSatinAl');

        $('.product_social_icon_wrapper').appendTo('.RightDetail');
        
        if (windowidth > 767) {
            $('.ProductIcon').appendTo('.RightDetail');
        }else{
            $('.ProductIcon').insertAfter('.urunOzellik');
        }
        $('.markaresmi').insertAfter('#divMarka');
        $('#divOnyazi').insertAfter('.ProductName');
        $('#divIndirimOrani').appendTo('#pnlFiyatlar');
        $('.UFavorilerimeEkle').appendTo('.BasketBtn');
        
    }
    setTimeout(function(){
       tooltips(); 
   }, 1000);
}
function topMenuCallback() {
    $('#instaStories').insertAfter('.mycart');
    $(".navUl li").each(function () {if ($(this).find("ul").length > 0) {$(this).addClass("ulVar"); }});
    
    if ( $('.navigation .navUl > li').length > 8 || windowidth < 1042) {
        mobileMenu();
    }else{
        $('.navigation .navUl > li.ulVar').each(function () {
            $(this).find('> ul').wrapAll('<div class="Flexscroll"></div>');
        });
    }
    
}
function blockCompleteCallback() {
    if ($(".HomeBody").length > 0) {
    }
    if ($(".CategoryBody").length > 0) {
        if ($('.brandlistselection select').length>0) {$('#divSayfalamaUst').addClass('Slct') }
    }
if ($(".ProductBody").length > 0) {
    UrunDetayPaylas();
    if (!pageInitialized) {
        if (windowidth<1042) {
            var cList = $('.urunTab ul li'); var cDiv = $('.urunDetayPanel'); for (var i = 0; i <= cList.length; i++) {for (var i = 0; i <= cDiv.length; i++) {$(cDiv[i]).appendTo(cList[i]); } } $(".urunDetayPanel").hide() ;
            $(".urunTab").removeAttr('class').addClass("mobilTab");
        }
    }
    $('body').on('click','.mobilTab >ul>li>a',function () {
        var openTab = $(this);
        if ($(this).parent().hasClass('active')) {$('.mobilTab >ul>li>a').parent().removeClass('active');}
        else {$('.mobilTab >ul>li>a').parent().removeClass('active');$(this).parent().addClass('active');}
        var tabName = openTab.attr('data-tab') || "";if (tabName === "Commets") {TabGetComments();}else if (tabName === "recommendations") {TabGetRecommendations();}
    });
    $('#linkOncekiSayfa').appendTo('ul.breadcrumb');
    $('.bedenT').insertAfter('#divUrunEkSecenek');
    if(windowidth < 768){
        $('#linkOncekiSayfa').appendTo('.leftImage');
        $('.UFavorilerimeEkle').appendTo('.leftImage');
    }
}
}
function urunListCallback() {

    if (globalBlokModel == 1) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 3; $('.leftBlock').addClass('LeftMiddle'); $('.centerCount').addClass('LeftMiddle');
    }
    else if (globalBlokModel == 2) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 2; $('.leftBlock').addClass("LeftMiddleRight"); $('.rightBlock').addClass("LeftMiddleRight"); $('.centerCount').addClass("LeftMiddleRight");
    }
    else if (globalBlokModel == 3) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.rightBlock').addClass("MiddleRight"); $('.centerCount').addClass("MiddleRight");
    }
    else if (globalBlokModel == 4) {
        if (urunDuzeniTipi == 0) urunDuzeniTipi = 4; $('.centerCount').addClass("Middle");
    }
    if ($('.CategoryBody').length>0) {$('body').on('click', '.sort_hrz',function(){urunDuzeniTipi = 1;urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.sort_2',function(){urunDuzeniTipi = 2;urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.sort_3',function(){urunDuzeniTipi = 3;urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.sort_4',function(){urunDuzeniTipi = 4;urunDuzeni(urunDuzeniTipi); }); $('body').on('click', '.sort_5',function(){urunDuzeniTipi = 5;urunDuzeni(urunDuzeniTipi); }); }

    if ($(".HomeBody").length > 0){
        $('.sliderBannerContainer .jCarouselLite ul').each(function () {
            if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel"))
                $(this).owlCarousel({
                    autoplay: false,
                    loop: false,
                    autoplayTimeout: 3000,
                    navClass: ['ProductListprev', 'ProductListnext'],
                    autoplaySpeed: 800,
                    autoplayHoverPause: true,
                    margin:30,
                    nav: true,
                    lazyLoad:true,
                    responsive: {0: {items: 2,autoplay: false,loop: false,nav:false, margin: 10}, 768:  {items: 3}, 1025:  {items: 3}, 1042: {items: 3},1200: {items: 4}}
                });
        });
    }
    $('.leftBlock .jCarouselLite ul').each(function () {if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) $(this).owlCarousel({rewind: true, margin: 10, nav: false, lazyLoad:true, responsive:{0: {items: 1},}, onInitialized: function callback() {lazyLoad(); } }); });
    $('.rightBlock .jCarouselLite ul').each(function () {if ($(this).find("li").length > 0 && !$(this).hasClass("owl-carousel")) $(this).owlCarousel({rewind: true, margin: 10, nav: false, lazyLoad:true, responsive:{0: {items: 1},}, onInitialized: function callback() {lazyLoad(); } }); });
    if ($('.CategoryBody').length>0) {urunDuzeni(urunDuzeniTipi);}

    if ($(".ProductBody").length > 0) {
        if($('#divSatinAl').css('display') == 'none'){$('.RightDetail').addClass('StokYok') }
            $('.centerCount .detaySliderContainer .jCarouselLite ul').each(function () {
                if ($(this).find("li").length > 0 && !$(this).hasClass("owl-loaded"))
                    $(this).owlCarousel({
                        autoplay: false,
                        loop: false,
                        autoplayTimeout: 2000,
                        navClass: ['ProductListprev', 'ProductListnext'],
                        autoplaySpeed: 800,
                        autoplayHoverPause: true,
                        margin:30,
                        nav: true,
                        lazyLoad:true,
                        responsive: {0: {items: 2,autoplay: true,loop: true,nav:false, margin: 10 }, 768:  {items: 3}, 1025:  {items: 3}, 1042: {items: 3},1200: {items: 4}}
                    });
            });
    }
    if (typeof InitTimers != "undefined") {
        InitTimers();
    }
    if ($(".CategoryBody").length > 0) {
        if (windowidth < 1042 && $('.FiltreUst').length == 0) {
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="tukgo"><a onclick="sortingClick(1000)" class="filterOrderInStock">'+translateIt("Urunler_Stoktakiler")+'</a></div>');
            $('body #divSayfalamaUst .category-vertical-filters.top-filters').prepend('<div class="FiltreUst"><div class="closeFilt"><i class="fal fa-times"></i></div><span></span><a onclick="clearAllFilters()"><i class="fal fa-trash-alt"></i></a></div>');
            if ($('.moreNum').length==0) {
                $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').find('.panel-heading').append('<div class="moreNum"></div>');
            }
            $('body').prepend('<div class="tabletaf"></div>');
            $('body').on('click','.mobilFilterBtn',function(event) {
                $('.mobilaf').addClass('acik');
                $('.tabletaf').addClass('acik');
                $('#divSayfalamaUst .filterBlock').addClass('active');
            });
            $('body').on('click','.closeFilt',function(event) {
                $('.mobilaf').removeClass('acik');
                $('.tabletaf').removeClass('acik');
                $('#divSayfalamaUst .filterBlock').removeClass('active');
            });
            $('body').on('click','.tabletaf',function (event) {$('body').removeClass('overflow'); $('.tabletaf').removeClass('acik'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fal fa-angle-right"></i>'); $('.mobilaf').removeClass('acik').removeAttr('style'); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector'); $('body #divSayfalamaUst .filterBlock').removeClass('active'); });

        }
        if (windowidth < 1042) {
            $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function(index, el) {
                if ($(this).find('li').hasClass('selected')) {var numlen = $(this).find('li.selected').length; $(this).addClass('more'); $(this).find('.moreNum').html(numlen);}
                else{$(this).removeClass('more'); $(this).find('.moreNum').html(''); }
            });
            $('#divSayfalamaUst .category-vertical-filters.top-filters .panel').each(function(index, el) {
                if ($('#divSayfalamaUst .category-vertical-filters.top-filters .panel').hasClass('more')) {$('.FiltreUst a').addClass('active'); return false; }
                else{$('.FiltreUst a').removeClass('active'); }
            });

            if ($('.sortingContent .filterOrderInStock').hasClass('selected')) {$('.tukgo .filterOrderInStock').addClass('selected');}else{$('.tukgo .filterOrderInStock').removeClass('selected');}
            if ($('.sortingContent .sortingButton').length > 0) {if ($('.sortingContent .sortingButton > a[onclick="sortingClick(1000)"]').hasClass('selected')) {$('.tukgo .filterOrderInStock').addClass('selected'); }else {$('.tukgo .filterOrderInStock').removeClass('selected'); } }
        }
    }
    urunKartCallBack();
    $(window).on('scroll',function () {
        if ($('.jCarouselLite[data-lazy-function]').length > 0) { lazyLoad(); }
    });


}
function urunDuzeni(tip) {
    if ($('.CategoryBody').length>0) {
        if ($('.blockSelect .sort_5').length==0) {$('.blockSelect .sort_4').after('<a href="javascript:;" class="sort_5"><i class="fas fa-th"></i></a>');}
        if ($('.blockSelect .sort_2').length==0) {$('.blockSelect .sort_3').before('<a href="javascript:;" class="sort_2"><i class="fas fa-th-large"></i></a>');}
        $('.sort_hrz').removeClass("Active"); 
        $('.sort_2').removeClass("Active"); 
        $('.sort_3').removeClass("Active"); 
        $('.sort_4').removeClass("Active"); 
        $('.sort_5').removeClass("Active");
        if (tip == 1) {$('.ProductList').removeClass().addClass('ProductList PlSc_hrz'); $(".ItemOrj").removeClass().addClass("ItemOrj col-12"); $('.blockSelect .sort_hrz').addClass("Active"); lazyLoad();}
        else if (tip == 2) {$('.ProductList').removeClass().addClass('ProductList PlSc_2'); $(".ItemOrj").removeClass().addClass("ItemOrj col-6"); $('.blockSelect .sort_2').addClass("Active"); lazyLoad();}
        else if (tip == 3) {$('.ProductList').removeClass().addClass('ProductList PlSc_3'); $(".ItemOrj").removeClass().addClass("ItemOrj col-4"); $('.blockSelect .sort_3').addClass("Active"); lazyLoad();}
        else if (tip == 4) {$('.ProductList').removeClass().addClass('ProductList PlSc_4'); $(".ItemOrj").removeClass().addClass("ItemOrj col-3"); $('.blockSelect .sort_4').addClass("Active"); lazyLoad();}
        else if (tip == 5) {$('.ProductList').removeClass().addClass('ProductList PlSc_5'); $(".ItemOrj").removeClass().addClass("ItemOrj col-5li"); $('.blockSelect .sort_5').addClass("Active"); lazyLoad();}
        else if (tip == 6) {$('.ProductList').removeClass().addClass('ProductList PlSc_6'); $(".ItemOrj").removeClass().addClass("ItemOrj col-2"); lazyLoad(); }
    }
}
function HesabimTakip() {
    $('body').addClass('HesabimTakip');
}
function Iletisimaspx() {
    $('body').addClass('Iletisimaspx');
    var uyead = globalModel.member.memberName;
    var uyemail = globalModel.member.memberEMail;
    $('#mainHolder_txtbxAdSoyad').attr('value',uyead);
    $('#mainHolder_txtbxMail').attr('value',uyemail);
    $('.iletisimLeft,.iletisimRight').wrapAll('<div class="AdBan"></div>');
    $('.iletisimForm').insertAfter('.AdBan');
    $('.iletisimLeftAdres').insertAfter('.iletisimLeftFirmaAdi');
}


function acilirMenuYonu() {
    $('.navigation .navUl > li').each(function (index, el) {
        var menuSayisi = $('.navigation .navUl > li').size();
        var menuSayisi2 = menuSayisi / 2;

        if (index <= menuSayisi2 - 1) {
            $(this).find('> ul').css('left', '0');
            $(this).find('.altMenu').css('left', '0');
            $(this).find('.altMenu').css('text-align', 'left');
            $(this).find('> ul li ul').css('left', '100%');
        } else {
            $(this).find('> ul').css('right', '0');
            $(this).find('.altMenu').css('right', '0');
            $(this).find('.altMenu').css('text-align', 'right');
            $(this).find('> ul li ul').css('right', '100%');
        };
    });
}
function anasayfaTab() {
    $('#anasayfatab .anasayfaTabAlt').first().addClass('active'); $('#anasayfatab ._tabHead li').first().addClass('_tabHead_active'); $('body').on('click','#anasayfatab ._tabHead li',function (event) {$('#anasayfatab ._tabHead li').removeClass('_tabHead_active'); $(this).addClass('_tabHead_active'); var secili = $(this).index(); $('#anasayfatab .anasayfaTabAlt').removeClass('active'); $('#anasayfatab .anasayfaTabAlt').eq(secili).addClass('active'); });
}

function tooltips(){
    $('.ProductIcon > div > a').attr('SC_toolTip','SC_toolTip');
    $('.ProductIcon > div > a').attr('data-placement','bottom');
    $('.ProductIcon > div > a').each(function(index, el) {
        if ($(this).find('.box1').attr('title') != undefined) {
            $(this).attr('title',$(this).find('.box1').attr('title'))
        }
        if ($(this).attr('SC_toolTip') == 'SC_toolTip' && $(this).find('.tooltip').length==0) {
            var titleInner = $(this).attr('title');
            var position = $(this).attr('data-placement');
            $(this).append('<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+titleInner+'</div></div>');
            $(this).find('.tooltip').addClass(position);
            var thisheight = $(this).find('.tooltip').height();
            var thiswidth = $(this).find('.tooltip').width();
            if ($('.tooltip').hasClass('right') || $('.tooltip').hasClass('left')) {$(this).find('.tooltip').css('margin-top',-thisheight/2); }
            if ($('.tooltip').hasClass('top') || $('.tooltip').hasClass('bottom')) {$(this).find('.tooltip').css('margin-left',-thiswidth/2); }
        }
    });
    $('.ProductIcon > div > a').mouseenter(function(event) {$(this).find('.tooltip').addClass('in'); });
    $('.ProductIcon > div > a').mouseleave(function(event) {$(this).find('.tooltip').removeClass('in'); });
}

function mobileMenu() { 
    var menuKopya = $('.navigation').html();
    $('.navigation').hide();
    $('body').prepend('<div class="mobilMenu"><div class="menuUstBolum"><div class="CloseBtnMenu"><i class="far fa-times"></i></div></div><div class="menuIcerikAlan">' + menuKopya + '</div>');
    if (windowidth<768) {$('.headerContent').append('<div class="mobilMenuAcButton"><span>Menu</span><i class="far fa-bars"></i></div><div class="welcomeOpen"><i class="fal fa-user"></i></div><div class="mycartClick"><i class="fal fa-shopping-bag" ></i></div>');}
    if (windowidth>767) {$('#logo').before('<div class="mobilMenuAcButton"><span>Menu</span><i class="far fa-bars"></i></div>');}
    
    if ($('.ResimliMenu1').length>0) {
        $('.mobilMenu .ResimliMenu1 li .altMenu').closest('li').append('<div class="ResimliDown"><i class="fal fa-angle-right"></i></div>');
        $('.mobilMenu .ResimliMenu1 li .altmenuSol li ul').closest('li').append('<div class="ResimliDown2"><i class="fal fa-angle-right"></i></div>');
        $('.altMenuMarkalar').parent().parent().addClass('Markalar'); var MarkaName = $('.Markalar').find(' > a').html();
        $('.mobilMenu .altMenuMarkalar').prepend('<span><div class="UpBtn"><i class="fal fa-angle-left"></i></div><a>'+MarkaName+'</a></span>');
        $('body').on('click','.ResimliDown',function(event) {if ($(this).find('.fal').hasClass('fa-angle-right')) {$(this).closest('li').find('.altMenu').addClass('active'); } else {$(this).closest('li').find('.altMenu').removeClass('active'); } });
        $('body').on('click','.ResimliDown2',function(event) {if ($(this).find('.fal').hasClass('fa-angle-right')) {$(this).closest('li').find('.ResimliMenu1AltUl').addClass('active'); } else {$(this).closest('li').find('.ResimliMenu1AltUl').removeClass('active'); } });
        $('.ResimliDown2').each(function(index, el) {var ClickMeNa = $(this).parent('li').find('>a').text(); $(this).closest('li').find('.ResimliMenu1AltUl').prepend('<span><div class="DownBtn"><i class="fal fa-angle-left"></i></div> <a href="">'+ClickMeNa+'</a></span>'); });
        $('.mobilMenu .altmenuSol > span').prepend('<div class="UpBtn"><i class="fal fa-angle-left"></i></div>');
        $('body').on('click','.DownBtn',function(event) {$('.ResimliMenu1AltUl').removeClass('active'); $('.altMenuler').animate({scrollTop:0},100); $('.menuIcerikAlan').animate({scrollTop:0},100); });
        $('body').on('click','.UpBtn',function(event) {$('.altMenu').removeClass('active'); $('.menuIcerikAlan').animate({scrollTop:0},100);});
    }
    
    if ($('.HeaderMenu2').length>0) {
        $('.mobilMenu .HeaderMenu2 > li > ul').closest('li').append('<div class="ResimsizDown"><i class="fal fa-angle-right"></i></div>');
        $('.mobilMenu .HeaderMenu2 > li > ul li ul').closest('li').append('<div class="ResimsizDown2"><i class="fal fa-angle-right"></i></div>');
        $('body').on('click','.ResimsizDown',function(event) {if ($(this).find('.fal').hasClass('fa-angle-right')) {$(this).closest('li').find('> ul').addClass('active'); } else {$(this).closest('li').find('> ul').removeClass('active'); } });
        $('body').on('click','.ResimsizDown2',function(event) {if ($(this).find('.fal').hasClass('fa-angle-right')) {$(this).closest('li').find('> ul').addClass('active'); } else {$(this).closest('li').find('> ul').removeClass('active'); } });
        $('.ResimsizDown').each(function(index, el) {var Down1 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack"><i class="fal fa-angle-left"></i></div> <span>'+Down1+'</span></span>'); });
        $('.ResimsizDown2').each(function(index, el) {var Down2 = $(this).parent('li').find('>a').text(); $(this).closest('li').find('> ul').prepend('<span><div class="NoiBack2"><i class="fal fa-angle-left"></i></div> <span>'+Down2+'</span></span>'); });
        $('body').on('click','.NoiBack2',function(event) {$(this).parent().parent().removeClass('active'); $('.mobilMenu .navUl > li > ul').animate({scrollTop:0},100); $('.menuIcerikAlan').animate({scrollTop:0},100); });
        $('body').on('click','.NoiBack',function(event) {$('.mobilMenu .navUl > li > ul').removeClass('active'); $('.menuIcerikAlan').animate({scrollTop:0},100); });
    }
    
    if ($('.lfMenuUl').length>0) {
        var YanMenu = $('.resimliYanMenu .Block_Text').html();
        $('.mobilMenu .menuIcerikAlan').append(YanMenu);
        $('.mobilMenu .lfMenuUl > li > .lfMenuAltContent').closest('li').append('<div class="YanResimDown"><i class="fal fa-angle-right"></i></div>');
        $('.mobilMenu .lfMenuAltContent .altMenu_1 .altMenu_Tittle').prepend('<div class="YanBackBtn"><i class="fal fa-angle-left"></i></div>');
        $('body').on('click','.YanResimDown',function(event) {if ($(this).find('.fal').hasClass('fa-angle-right')) {$(this).closest('li').find('.lfMenuAltContent').addClass('active'); } else {$(this).closest('li').find('.lfMenuAltContent').removeClass('active'); } });
        $('body').on('click','.YanBackBtn',function(event) {$('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.menuIcerikAlan').animate({scrollTop:0},100); });
    }

    $('.mobilMenu').after('<div class="mobilaf"></div>');
    if (windowidth<767) {
        $('#divIcerik').on('touchend',function(){$('.welcome').removeClass('active'); $('.searchContent').removeClass('active'); });
        $('.searchContent').insertAfter('.headerContent');
        $('.welcome').insertAfter('.headerContent');
    }
    $('.mobilMenuAcButton').on('click',function (event) {$('body').addClass('overflow'); $('.mobilMenu').addClass('acik'); $('.mobilaf').addClass('acik').removeAttr('style');; $('.CartProduct').removeClass('animated'); $('.welcome').removeClass('active'); $('.searchContent').removeClass('active'); $('#lang_flag_container').removeClass('selector'); });
    $('.welcomeOpen').on('click',function () {$('.welcome').toggleClass('active'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fal fa-angle-right"></i>'); $('.CartProduct').removeClass('animated'); $('.searchContent').removeClass('active'); $('#lang_flag_container').removeClass('selector'); });
    $('.mobilaf,.CloseBtnMenu').on('click',function (event) {$('body').removeClass('overflow'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fal fa-angle-right"></i>'); $('.mobilaf').removeClass('acik').removeAttr('style'); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector'); $('body #divSayfalamaUst .filterBlock').removeClass('active'); });

    if (windowidth < 768) {
        bottomHead();
    }
}
function UrunDetayPaylas () {
    var title = $(".ProductName h1 span").text();
    var url = window.location.href;
    var image = "http://" + location.host + "" + $('.Images #imgUrunResim').attr('src') + "";
    var description = "";
    $('.product_social_icons').on('click',function () {
        if ($(this).attr("content") == "facebook") {
            if (isMobileDevice()) {
                window.open("http://m.facebook.com/sharer.php?u=" + url + "");
            } else {
                window.open("http://www.facebook.com/sharer.php?s=100&p[medium]=100&p[title]=" + $.trim(title) + "&p[images][0]=" + image + "&p[url]=" + url + "&p[summary]=" + $.trim(title) + "&t=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
            }
        } else if ($(this).attr("content") == "twitter") {
            window.open("http://twitter.com/intent/tweet?text=" + $.trim(title) + "&url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else if ($(this).attr("content") == "googleplus") {
            window.open("https://plus.google.com/share?url=" + url + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        } else if ($(this).attr("content") == "pinterest") {
            window.open("http://pinterest.com/pin/create/button/?url=" + url + "&media=" + image + "&description=" + $.trim(title) + "", "sharer", "toolbar=0,status=0,width=630,height=430");
        }
    });
}

function sepetBindRefresh(res){
    if (typeof res.cart.products != 'undefined') {if (res.cart.products.length>0) {$('.mycart').addClass('more');$('.CartProduct').addClass('more'); $('.SepetBlock').addClass('more'); } else {$('.mycart').removeClass('more');$('.CartProduct').removeClass('more'); $('.SepetBlock').removeClass('more'); } }

    if (windowidth<768) {
        $('.mycart > a').removeAttr('href');
        if ($(".SepetUst").length == 0){
            $('.CartProduct').prepend('<div class="SepetUst"><div class="seClose"><i class="fal fa-times"></i></div><span>' + translateIt("GlobalMasterPage_Sepetim") + '</span></div>');
        }
    }
    if ($('.CartProduct span').hasClass('spanustSepetteUrunYok')) { $('.CartProduct').addClass('SepetBos'); }

    $(".mycartClick,.mycart .sepetUrunSayisi").on("click", function () { $('.mobilMenu').removeClass('acik'); $('.CartProduct').addClass('animated'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fal fa-angle-right"></i>'); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('#lang_flag_container').removeClass('selector'); });
    $('.seClose').on("click",function () { $('body').removeClass('overflow transform'); $('.mobilMenu').removeClass('acik'); $('.altMenu').removeClass('active'); $('.ResimliMenu1AltUl').removeClass('active'); $('.mobilMenu .KatMenu1 > li ul').removeClass('active'); $('.mobilMenu .navUl ul').removeClass('active'); $('.mobilMenu .lfMenuAltContent').removeClass('active'); $('.mobilAcilirMenu').html('<i class="fal fa-angle-right"></i>'); $('.mobilaf').removeClass('acik').removeAttr('style'); $('.searchContent').removeClass('active'); $('.welcome').removeClass('active'); $('.CartProduct').removeClass('animated'); $('#lang_flag_container').removeClass('selector'); $('body #divSayfalamaUst .filterBlock').removeClass('active'); });
}
function SepetEkrani() {
    $('.navigation .navUl').wrapAll('<div></div>');
    $('.Mic').insertAfter('.navUl');
    setTimeout(function(){var wle = $('.welcome').html(); $('.welcome').html(''); $('.welcome').append('<div>'+wle+'</div>'); },1500);
    if ($('.sepett').find('div').length>0) {$('.mycart').addClass('more');}
    if ($('.BasketDetailCargo').length>0) {$('.mycart').addClass('more');}
    if ($('.odemeMenuContent').length>0) {$('.mycart').addClass('more');}
    urunKartCallBack();
}

var cntrlBot = false;
function bottomHead() {
    if (!cntrlBot && $('.bottomHead').length==0) {
        $('body:not(.sepetimBody)').append('<div class="bottomHead"> <ul> <li class="homeC"> <a href="/"><i class="fal fa-home"></i><span>'+translateIt("GlobalMasterPage_Anasayfa")+'</span></a> </li> <li class="favoC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fal fa-heart"></i><span>'+translateIt("Favorilerim_Baslik")+'</span><div class="favNum"></div></a> </li> <li class="cartC"> <a href="/sepetim.aspx"><i class="fal fa-shopping-cart"></i><span>'+translateIt("GlobalMasterPage_Sepetim")+'</span></a> </li> <li class="welcC"> <a href="javascript:void(0)" onclick="GirisKontrol(0)"><i class="fal fa-user"></i><span>'+translateIt("GlobalMasterPage_MobilUyeGirisi")+'</span></a> </li> </ul> </div>');
        if (siteSettings.isAuthenticated == true) {$('.welcC a').attr('href','/hesabim.aspx'); $('.favoC a').attr('href','/Hesabim.aspx/#/Favorilerim'); $('.welcC span').html(translateIt("GlobalMasterPage_MobilHesabim")); }
        cntrlBot = true;
    }
}