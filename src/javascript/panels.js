(function ($,w) {
	w.panelsJS = function (settings) {
		var s = $.extend({},settings);
		var self = this;

		self.panels = $('[data-role="panel"]');

		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var topZindex = self.panels.length+1;

		self.win = $('.window');

		self.panels.each(function () {
			var $panel = $(this);
			if ($panel.data('scale')) {
				$panel.css({'-webkit-transform':'scale(0)'});
			}
		});

		self.position = function ($panel) {
			var pos = $panel.data('pos');

			switch (pos) {
				case "left":
					$panel.css('left', (0 - winWidth) );
				break;
				case "right":
					$panel.css('left', (winWidth) );
				break;
				case "bottom":
					$panel.css('top', (winHeight) );
				break;
				case "top":
					$panel.css('top', (0 - winHeight) );
				break;
				default:
					$panel.css({
						'left' : 0,
						'top' : 0
					});
				break;
			}
			return this;
		};



		self.show = function (panelId) {
			var $panel = $(panelId),
				pos = $panel.data('pos') || "default",
				fade = !!($panel.data('fade')) || false,
				scale = !!($panel.data('scale')) || false;

			$panel.addClass('open');


			var prop = {'left' : 0, 'top' : 0};

			if (fade) {
				pos = "default";
				prop = {'opacity': 1};
			} else if (scale) {
				pos = "default";
				prop = {'scale': 1};
			}

			if (pos === "left" || pos === "right") {
				prop = {'left' : 0};
			} else if (pos === "bottom" || pos === "top") {
				prop = {'top' : 0};
			}

			$panel.css('z-index', topZindex+1).animate(prop, 200, 'linear');
			
			return this;
		};

		self.hide = function (panelId) {
			var $panel = $(panelId),
				pos = $panel.data('pos'),
				fade = $panel.data('fade') || false,
				scale = !!($panel.data('scale')) || false;;
			
			var prop = {'left' : 0, 'top' : 0};

			if (fade) {
				pos = "default";
				prop = {'opacity': 0};
			} else if (scale) {
				pos = "default";
				prop = {'scale': 0};
			}

			if (pos === "left") {
				prop = {'left' : 0 - winWidth};
			} else if (pos === "right") {
				prop = {'left' : winWidth};
			} else if (pos === "bottom") {
				prop = {'top' : winHeight};
			} else if (pos === "top") {
				prop = {'top' : 0 - winHeight};
			}

			$panel.animate(prop, 200, 'linear',function () {
				$panel.css('z-index', 1).removeClass('open');
			});
			
			return this;
		};

		self.panelShift = function (panelId, direction, ammount) {
			if (!direction || !ammount) {
				return this;
			}

			var $panel = $(panelId),
				prop = {};

			ammount = (direction === 'left' || direction === 'up') ? 0-ammount : ammount;

			if (direction === "left" || direction === "right") {
				direction = 'left';
			} else if (direction === 'down' || direction === 'up') {
				direction = 'top';
			}

			prop[direction] = (parseInt($panel.css(direction),10) == ammount) ? 0 : ammount;

			$panel.animate(prop, 200, 'linear');
			
			return this;
		};

		self.panels.each(function (i,node) {
			self.position($(this));
		});

		return this;
	};
})( Zepto || jQuery, window );