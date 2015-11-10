// First part of Google Analytics tracking code.
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-12405006-2']);
_gaq.push(['_trackPageview']);

// Define variables for Disqus comments.
if (typeof mariusv_slug !== '/') {
    var disqus_shortname = 'mariusvoila';
    var disqus_identifier = mariusv_slug;
    var disqus_url = mariusv_url;
}

(function () {


    // Load some external JavaScript asynchronously.
    var loadExternalJS = function (url)
    {
        s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url;
        document.body.appendChild(s);

    };//end loadExternalJS


    // This function will get called when the windows load.
    var onLoadCallback = function ()
    {
        // Hide toolbar on iPhone.
        if (navigator.userAgent.match(/iphone/i)) {
            window.scrollTo(0, 0);
        }

        // Load share buttons.
        var shareButtonDiv = document.getElementById('share-buttons');
        if (shareButtonDiv) {
            // Twitter tweet button <http://twitter.com/about/resources/tweetbutton>.
            shareButtonDiv.innerHTML += '<a class="twitter-share-button" '+
                'href="https://twitter.com/share" data-count="none" data-text="'+mariusv_title+
                '" data-url="'+mariusv_url+'" data-via="mariusvoila">Tweet</a>';
            loadExternalJS('https://platform.twitter.com/widgets.js');

            // Facebook like button <http://developers.facebook.com/docs/reference/plugins/like/>.
            shareButtonDiv.innerHTML += '<iframe class="facebook-like-button" '+
                'src="https://www.facebook.com/plugins/like.php?href='+mariusv_url+
                '&amp;layout=button_count&amp;show_faces=true&amp;width=50&amp;action=like&amp;'+
                'colorscheme=light&amp;height=20" scrolling="no" frameborder="0" '+
                'allowTransparency="true"></iframe>';

            // Linkedin share buttom <http://www.linkedin.com/publishers>.
            shareButtonDiv.innerHTML += '<script type="in/share" data-url="'+mariusv_url+
                '"></script>';
            loadExternalJS('https://platform.linkedin.com/in.js');

            // Google +1 button <http://www.google.com/webmasters/+1/button/>.
            shareButtonDiv.innerHTML += '<g:plusone size="medium" count="false" href="'+mariusv_url+
                '"></g:plusone>';
            loadExternalJS('https://apis.google.com/js/plusone.js');
        }

        // Load Disqus comments.
        var commentDiv = document.getElementById('disqus_thread');
        if (commentDiv) {
            loadExternalJS('https://mariusvoila.disqus.com/embed.js');
            loadExternalJS('https://mariusvoila.disqus.com/count.js');
        }

        // Add target="_blank" to any links that go outside this domain.
        var a = document.getElementsByTagName('a');
        var l = a.length;
        var u = location.href;
        var d = u.replace(/^([a-z]+:\/\/[^\/]+)\/?.*/, '$1');
        for (var i = 0; i < l; i++) {
            if (a[i].href.indexOf(d) != 0) {
                a[i].target = '_blank';
            }
        }

    };//end onLoadCallback


    // Second part of Google Analytics tracking code.
    if (location.hostname === 'www.mariusv.com') {
        loadExternalJS('https://www.google-analytics.com/ga.js');
    }


    // Run onLoadCallback asynchronously.
    window.onload = function ()
    {
        setTimeout(onLoadCallback, 1);

    };//end window.onload


})();
