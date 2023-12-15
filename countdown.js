var Countdown = {
    // Backbone-like structure
    $el: $('.countdown'),

    // Params
    countdown_interval: null,
    total_seconds: 0,

    // Initialize the countdown
    init: function () {
        // DOM
        this.$ = {
            hours: this.$el.find('.bloc-time.hours .figure'),
            minutes: this.$el.find('.bloc-time.min .figure'),
            seconds: this.$el.find('.bloc-time.sec .figure')
        };

        // Initialize total seconds
        this.calculateTotalSeconds();

        // Animate countdown to the end
        this.count();
    },

    calculateTotalSeconds: function () {
        var now = new Date();
        var targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0); // Set the target date to tomorrow 00:00:00
        this.total_seconds = Math.floor((targetDate - now) / 1000); // Calculate the time difference in seconds
    },

    count: function () {
        var that = this,
            $hour_1 = this.$.hours.eq(0),
            $hour_2 = this.$.hours.eq(1),
            $min_1 = this.$.minutes.eq(0),
            $min_2 = this.$.minutes.eq(1),
            $sec_1 = this.$.seconds.eq(0),
            $sec_2 = this.$.seconds.eq(1);

        this.countdown_interval = setInterval(function () {
            if (that.total_seconds > 0) {
                --that.total_seconds;

                var hours = Math.floor(that.total_seconds / 3600);
                var minutes = Math.floor((that.total_seconds % 3600) / 60);
                var seconds = that.total_seconds % 60;

                // Update DOM values
                that.checkHour(hours, $hour_1, $hour_2);
                that.checkHour(minutes, $min_1, $min_2);
                that.checkHour(seconds, $sec_1, $sec_2);
            } else {
                clearInterval(that.countdown_interval);
            }
        }, 1000);
    },

    animateFigure: function ($el, value) {
        var that = this,
            $top = $el.find('.top'),
            $bottom = $el.find('.bottom'),
            $back_top = $el.find('.top-back'),
            $back_bottom = $el.find('.bottom-back');
    
        // Before we begin, change the back value
        $back_top.find('span').html(value);
    
        // Also change the back bottom value
        $back_bottom.find('span').html(value);
    
        // Then animate
        TweenMax.to($top, 0.5, {
            rotationX: '-90deg',
            transformPerspective: 300,
            ease: Power1.easeInOut,
            onComplete: function () {
                $top.html(value);
                $bottom.html(value);
                TweenMax.set($top, { rotationX: 0 });
            }
        });
    
        TweenMax.from($back_top, 0.5, {
            rotationX: '180deg',
            transformPerspective: 300,
            ease: Power1.easeInOut,
            clearProps: 'all',
            delay: 0.5 // Delay the back_top animation to synchronize with the front animation
        });
    },
    
    
    

    checkHour: function (value, $el_1, $el_2) {
        var val_1 = value.toString().charAt(0),
            val_2 = value.toString().charAt(1),
            fig_1_value = $el_1.find('.top').html(),
            fig_2_value = $el_2.find('.top').html();

        if (value >= 10) {
            // Animate only if the figure has changed
            if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
            if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
        } else {
            // If we are under 10, replace the first figure with 0
            if (fig_1_value !== '0') this.animateFigure($el_1, 0);
            if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
        }
    }
};

// Let's go!
Countdown.init();
