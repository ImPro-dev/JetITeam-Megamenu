define([
    "jquery",
    "matchMedia",
    "menu"
], function ($, mediaCheck) {
    "use strict";

    $.widget('JetITeam.megamenu', $.mage.menu, {

        options: {
            mobileBreakpoint: 767,
        },

        _create: function() {
            var megamenu = $('.jetiteam-megamenu', this.element);

            this._mobileMenu();
            this._super();
            this._toggleClass(megamenu);
            this._setWidthMegamenu(megamenu);
        },

        _setOption: function( key, value ) {
            this._super( "_setOption", key, value );
        },

        _init: function () {
            var mobileBreakpoint = this.options.mobileBreakpoint;
            this.delay = this.options.delay;

            if (this.options.expanded === true) {
                this.isExpanded();
            }


            if (this.options.responsive === true) {
                mediaCheck({
                    media: '(max-width: ' + mobileBreakpoint + 'px)',
                    entry: $.proxy(function () {
                        this._toggleMobileMode();
                    }, this),
                    exit: $.proxy(function () {
                        this._toggleDesktopMode();
                    }, this)
                });
            }

            this._assignControls()._listen();
        },

        toggle: function () {
            if($(this.element).parent('.desktop-only').length){
                return false;
            }
            this._super();
        },

        _toggleMobileMode: function () {
            this._super();

            var subMenus = this.element.find('.parent');
            $.each(subMenus, $.proxy(function (index, item) {
                var category = $(item).find('> a span').not('.ui-menu-icon').text(),
                    categoryUrl = $(item).find('> a').attr('href'),
                    menu = $(item).find('> ul.submenu, > ul.mm-submenu');

                this.categoryLink = $('<a>')
                    .attr('href', categoryUrl)
                    .text($.mage.__('All ') + category);

                this.categoryParent = $('<li>')
                    .addClass('ui-menu-item all-category')
                    .html(this.categoryLink);

                // console.log(this.categoryParent);

                if (menu.find('.all-category').length === 0) {
                    menu.prepend(this.categoryParent);
                }

            }, this));

            this._destroy();
            this._subCategoriesCollapseInit();

        },
        _toggleDesktopMode: function () {
            this._super();
            // this._destroy();
            $('.navigation .parent').collapsible().collapsible('destroy');
            $('.mm-submenu, .submenu', '.navigation .parent:not(.level0)').show();
            this.refresh();
        },

        _subCategoriesCollapseInit: function () {
            $('.navigation .parent').collapsible({
                header: "> a",
                content: ".submenu, .mm-submenu"
            });
        },

        _mobileMenu: function () {
            var topmenu = $('nav.jetiteam-top-navigation');
            if(topmenu.length) return false;

            var mobileBreakpoint = this.options.mobileBreakpoint;
            var nav = $('nav.mobile-only');
            var navDesktop = $(this.element).parent('.desktop-only');

            mediaCheck({
                media: '(min-width: ' + mobileBreakpoint + 'px)',
                entry: function () {
                    nav.removeClass('active');
                    navDesktop.addClass('active');
                },
                exit: function ()  {
                    nav.addClass('active');
                    navDesktop.removeClass('active');
                }
            });
        },

        _open: function( submenu ) {
            this._super( submenu );

            if (submenu.is(this.options.differentPositionMenus)) {
                var position = $.extend({
                    of: this.active
                }, this.options.differentPosition );
                submenu.position( position );
            }
        },

        _toggleClass: function( selector ) {
            var ownClass = 'megamenu-wrapper';
            mediaCheck({
                media: '(max-width: 767px)',
                entry: function () { 
                    selector.removeClass(ownClass);
                },
                exit: function ()  {
                    if( !selector.hasClass(ownClass) ) {
                        selector.addClass(ownClass);
                    }
                }
            });
        },

        _setWidthMegamenu: function( selector ) {
            if(selector.hasClass('in-sidebar')){
                $(window).on('resize.menu', function(){
                    var pageWidth = $('.columns').innerWidth();
                    var sidebarWidth = $('.sidebar .navigation').innerWidth();
                    selector.css('min-width', pageWidth - sidebarWidth);
                }).trigger('resize.menu');
            }
        }

    });

    return $.JetITeam.megamenu;
});