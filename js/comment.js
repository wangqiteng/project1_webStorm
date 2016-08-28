/**
 * JS评分效果-宝贝与描述相符
 */
function MatchScore(options) {
    this.config = {
        selector: '.descriptionStar',      // 评分容器样式
        renderCallback: null,               // 渲染页面后回调
        callback: null                       // 点击评分回调
    };

    this.cache = {                           //静态的信息
        aMsg: [
            "很不满意|差得太离谱，与卖家描述的严重不符，非常不满",
            "不满意|部分有破损，与卖家描述的不符，不满意",
            "一般|质量一般，没有卖家描述的那么好",
            "满意|质量不错，与卖家描述的基本一致，还是挺满意的",
            "非常满意|质量非常好，与卖家描述的完全一致，非常满意"
        ],
        iStar1: 0,
        iScore1: 0
    };

    this.init(options);
}

//函数属性
MatchScore.prototype = {

    constructor: MatchScore,

    init: function (options) {
        this.config = $.extend(this.config, options || {});//合并结果
        var self = this,
            _config = self.config,
            _cache = self.cache;

        self._renderHTML();                                   //renderHtml 是用参数中的 htmlString 为内容返回给客户端
    },
    _renderHTML: function () {

        var self = this,
            _config = self.config;
        var html = '<span class="desc"></span>' +
            '<p class="star-p hidden"></p>';
        $(_config.selector).each(function (index, item) {
            $(item).append(html);                           //append(content)：方法在被选元素的结尾（仍然在内部)插入指定内容
            $(item).wrap($('<div class="parentCls1" style="position:relative"></div>'));//body里面所有class命名为.wrap的盒子,包括所有子孙级元素的class。
            var parentCls = $(item).closest('.parentCls1');//函数将从当前元素本身开始，逐级向上查找第一个符合指定表达式的元素
            self._bindEnv(parentCls);
            _config.renderCallback && $.isFunction(_config.renderCallback) && _config.renderCallback();
        });

    },
    _bindEnv: function (parentCls) {

        var self = this,
            _config = self.config,
            _cache = self.cache;

        $(_config.selector + ' li', parentCls).each(function (index, item) {

            // 鼠标移入
            $(item).mouseover(function (e) {

                var offsetLeft = $('ul', parentCls)[0].offsetLeft;
                ismax(index + 1);

                $('p', parentCls).hasClass('hidden') && $('p', parentCls).removeClass('hidden');
                $('p', parentCls).css({'left': index * $(this).width() + 12 + 'px'});


                var html = '<em>' +
                    '<b>' + (index + 1) + '</b>分 ' + _cache.aMsg[index].split('|')[0] + '' +
                    '</em>' + _cache.aMsg[index].split('|')[1];
                $('p', parentCls).html(html);
            });

            // 鼠标移出
            $(item).mouseout(function () {
                ismax();
                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            });

            // 鼠标点击
            $(item).click(function (e) {
                var index = $(_config.selector + ' li', parentCls).index($(this));
                _cache.iStar1 = index + 1;

                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
                var html = '<strong>' +
                    (index + 1) +
                    '分</strong>';

                $('.desc', parentCls).html(html);
                _config.callback && $.isFunction(_config.callback) && _config.callback({descriptionStarAmount: _cache.iStar1});
            });

        });

        function ismax(iArg) {
            _cache.iScore1 = iArg || _cache.iStar1;
            var lis = $(_config.selector + ' li', parentCls);

            for (var i = 0; i < lis.length; i++) {
                lis[i].className = i < _cache.iScore1 ? "on" : "";
            }
        }
    }
};

/**
 * JS评分效果-卖家的服务态度
 */
function ServerAttitude(options) {
    this.config = {
        selector: '.attitudeStar',     // 评分容器
        renderCallback: null, // 渲染页面后回调
        callback: null         // 点击评分回调
    };

    this.cache = {
        bMsg: [
            "很不满意|卖家态度很差，还骂人、说脏话，简直不把顾客当回事",
            "不满意|卖家有点不耐烦，承诺的服务也兑现不了",
            "一般|卖家回复问题很慢，态度一般，谈不上沟通顺畅",
            "满意|卖家服务挺好的，沟通挺顺畅的，总体满意",
            "非常满意|卖家的服务太棒了，考虑非常周到，完全超出期望值"
        ],
        iStar2: 0,
        iScore2: 0
    };

    this.init(options);
}
//函数属性
ServerAttitude.prototype = {

    constructor: ServerAttitude,

    init: function (options) {
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;

        self._renderHTML();
    },
    _renderHTML: function () {
        var self = this,
            _config = self.config;
        var html = '<span class="desc"></span>' +
            '<p class="attitudeStar-p hidden"></p>';
        $(_config.selector).each(function (index, item) {
            $(item).append(html);
            $(item).wrap($('<div class="parentCls2" style="position:relative"></div>'));
            var parentCls = $(item).closest('.parentCls2');
            self._bindEnv(parentCls);
            _config.renderCallback && $.isFunction(_config.renderCallback) && _config.renderCallback();
        });

    },
    _bindEnv: function (parentCls) {
        var self = this,
            _config = self.config,
            _cache = self.cache;

        $(_config.selector + ' li', parentCls).each(function (index, item) {

            // 鼠标移入
            $(item).mouseover(function (e) {
                var offsetLeft = $('ul', parentCls)[0].offsetLeft;      //offsetLeft 获取的是相对于父对象的左边距
                ismax(index + 1);

                $('p', parentCls).hasClass('hidden') && $('p', parentCls).removeClass('hidden');//删除class(隐藏)
                $('p', parentCls).css({'left': index * $(this).width() + 12 + 'px'});//是使星星可见


                var html = '<em>' +
                    '<b>' + (index + 1) + '</b>分 ' + _cache.bMsg[index].split('|')[0] + '' +
                    '</em>' + _cache.bMsg[index].split('|')[1];
                $('p', parentCls).html(html);
            });

            // 鼠标移出
            $(item).mouseout(function () {
                ismax();
                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            });

            // 鼠标点击
            $(item).click(function (e) {
                var index = $(_config.selector + ' li', parentCls).index($(this));
                _cache.iStar2 = index + 1;

                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
                var html = '<strong>' +
                    (index + 1) +
                    '分</strong>';

                $('.desc', parentCls).html(html);
                _config.callback && $.isFunction(_config.callback) && _config.callback({attitudeStarAmount: _cache.iStar2});
            });

        });

        function ismax(iArg) {
            _cache.iScore2 = iArg || _cache.iStar2;
            var lis = $(_config.selector + ' li', parentCls);

            for (var i = 0; i < lis.length; i++) {
                lis[i].className = i < _cache.iScore2 ? "on" : "";
            }
        }
    }
};


/**
 * JS评分效果-物流服务的质量
 */
function DeliverSpeed(options) {
    this.config = {
        selector: '.deliveryStar',// 评分容器
        renderCallback: null, // 渲染页面后回调
        callback: null         // 点击评分回调
    };

    this.cache = {
        cMsg: [
            "很不满意|到货速度严重延误，货物破损，派件员态度恶劣",
            "不满意|到货速度慢，外包装严重变形，派件员不耐烦，态度差",
            "一般|到货速度一般，外包装变形，派件员态度一般",
            "满意|到货速度及时，派件员态度较好",
            "非常满意|到货速度非常快，商品完好无损，派件员态度很好"
        ],
        iStar3: 0,
        iScore3: 0
    };

    this.init(options);
}
//函数属性
DeliverSpeed.prototype = {

    constructor: DeliverSpeed,

    init: function (options) {
        this.config = $.extend(this.config, options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;

        self._renderHTML();
    },
    _renderHTML: function () {
        var self = this,
            _config = self.config;
        var html = '<span class="desc"></span>' +
            '<p class="deliveryStar-p hidden"></p>';
        $(_config.selector).each(function (index, item) {
            $(item).append(html);
            $(item).wrap($('<div class="parentCls3" style="position:relative"></div>'));
            var parentCls = $(item).closest('.parentCls3');
            self._bindEnv(parentCls);
            _config.renderCallback && $.isFunction(_config.renderCallback) && _config.renderCallback();
        });

    },
    _bindEnv: function (parentCls) {
        var self = this,
            _config = self.config,
            _cache = self.cache;

        $(_config.selector + ' li', parentCls).each(function (index, item) {

            // 鼠标移入
            $(item).mouseover(function (e) {
                var offsetLeft = $('ul', parentCls)[0].offsetLeft;
                ismax(index + 1);

                $('p', parentCls).hasClass('hidden') && $('p', parentCls).removeClass('hidden');
                $('p', parentCls).css({'left': index * $(this).width() + 12 + 'px'});


                var html = '<em>' +
                    '<b>' + (index + 1) + '</b>分 ' + _cache.cMsg[index].split('|')[0] + '' +
                    '</em>' + _cache.cMsg[index].split('|')[1];
                $('p', parentCls).html(html);
            });

            // 鼠标移出
            $(item).mouseout(function () {
                ismax();
                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
            });

            // 鼠标点击
            $(item).click(function (e) {
                var index = $(_config.selector + ' li', parentCls).index($(this));
                _cache.iStar3 = index + 1;

                !$('p', parentCls).hasClass('hidden') && $('p', parentCls).addClass('hidden');
                var html = '<strong>' +
                    (index + 1) +
                    '分</strong>';

                $('.desc', parentCls).html(html);
                _config.callback && $.isFunction(_config.callback) && _config.callback({deliveryStarAmount: _cache.iStar3});
            });

        });

        function ismax(iArg) {
            _cache.iScore3 = iArg || _cache.iStar3;
            var lis = $(_config.selector + ' li', parentCls);

            for (var i = 0; i < lis.length; i++) {
                lis[i].className = i < _cache.iScore3 ? "on" : "";
            }
        }
    }
};