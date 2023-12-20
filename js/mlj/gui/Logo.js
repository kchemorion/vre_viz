(function (component) {
    
    /**         
     * @class Create a new Logo widget
     * @augments  MLJ.gui.Widget
     * @private
     * @memberOf MLJ.gui.widget
     * @author Stefano Gabriele 
     */
    var _Logo = function () {

        var LOGO_WIDTH = 96;
        var LOGO_HEIGHT = 821 * LOGO_WIDTH / 1023;
        var insets = 10;
        var _PiP;
        var _dialog = new MLJ.gui.component.Dialog(
            {title: "filter meshes according to different features", draggable: true, width: 1500, modal: true, resizable: false}
        );

        this._make = function () {                 
            _PiP = new component.PiP();

            var $logo = $('<img id="logo" src="https://cdn-icons-png.flaticon.com/512/2080/2080946.png">')
                //.hide(); // Hide the logo initially

            _dialog.appendContent(
                '<div class="airtable-embed">'
                + '<iframe title="SpineView" width="1495px" height="800px" src="https://app.powerbi.com/view?r=eyJrIjoiZWFhMGM4YWUtODcwOS00Y2EyLTg5ZGUtZTNmZmUxNjkwZDc5IiwidCI6IjQyZTFiNDJmLWRlNzQtNDI5MC05ZDNhLTExNDkyNTUzMTM1ZSIsImMiOjl9" frameborder="0" allowFullScreen="true"></iframe>'
                + '</div>' + MLJ.core.plugin.Manager.getFilterPlugins().size() + " filters."
            );

            $logo.load(function () {
                _PiP.appendContent(this);
                $(this).width(LOGO_WIDTH);
            });

            $logo.css('cursor', 'pointer');

            $(document).ready(function () {
                var x = $('#mlj-tools-pane').outerWidth() + insets;
                var y = $(window).height() - LOGO_HEIGHT - insets;
                _PiP.setX(x);
                _PiP.setY(y);
            });

            $(window).resize(function () {
                var $tp = $('#mlj-tools-pane');
                var newX = $tp.outerWidth() + $tp.offset().left + insets;
                var newY = $(window).height() - LOGO_HEIGHT - insets;
                _PiP.setX(newX);
                _PiP.setY(newY);
            });

            var $tabbedPane = $('#mlj-tabbed-pane');
            var isPaneVisible = true;

            $tabbedPane.on('tabsactivate', function () {
                if (isPaneVisible) {
                    $logo.hide();
                } else {
                    $logo.show();
                }
            });

            // Add event listener to the logo button to show the dialog on click
            $logo.click(function () {               
                _dialog.show();
            });

            return _PiP.$;
        };
    };

    MLJ.extend(MLJ.gui.Widget, _Logo);

    // Install widget
    MLJ.gui.installWidget("Logo", new _Logo());

})(MLJ.gui.component);
