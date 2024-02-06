/**
 * @file Defines and installs the SceneBar widget
 * @author Stefano Gabriele
 */
(function (component) {
    /**
     * @class Create a new SceneBar widget
     * @augments  MLJ.gui.Widget
     * @private
     * @memberOf MLJ.gui.widget
     * @author Stefano Gabriele
     */
    var _SceneBar = function () {
        var _toolBar = new component.ToolBar();
        var _dialog = new component.Dialog({
            title: "Save mesh",
            modal: true,
            draggable: false,
            resizable: false,
        });

        var _html =
            "<div id='mlj-save-dialog'><label for='filename'>Name:</label><br/>";
        _html += "<input id='filename' type='text'/>";
        _html += "<label for='extension'>Extension:</label><br/>";
        _html += "<select id='extension'>";

        var ext;
        for (var key in MLJ.core.File.SupportedExtensions) {
            ext = MLJ.core.File.SupportedExtensions[key];
            _html += "<option name='" + ext + "'>" + ext + "</option>";
        }

        _html += "</select>";
        _html +=
            "Compress? <input name='zip' id='zipCheck' type='checkbox' value='1'>";
        _html +=
            "<div id='button-wrapper'><button id='mlj-save-dialog-button'>Save</button></div></div>";
        _dialog.appendContent(_html);

        // ... (existing code for other dialogs)

        var _dialogCameraPosition = new component.Dialog({
            title: "Camera position",
            modal: true,
            draggable: false,
            resizable: false,
            width: 400,
        });

        var _html = "<div id='mlj-cameraPosition-dialog'>";
        _html +=
            "<br/><div style='width: 70%; margin: 0 auto; '><div style='text-align: left; margin-left: 15px;> <label for='website'>Shift + C: copy current viewpoint</label></div> ";
        _html +=
            "<br/><div style='text-align: left; margin-left: 15px; margin-top: -15px; margin-bottom: 5px;> <label for='website'>Shift + V: load saved viewpoint</label></div></div> ";
        _html +=
            "<br/><div style='text-align: center;> <label for='website'>Camera Position as JSON</label></div> ";
        _html +=
            "<textarea id='cameraJSON' style='width: 350px; height: 335px; margin-left: 10px; margin-top: 5px'>";
        _html += "</textarea>";
        _html +=
            "<div id='errorMessageDiv' style='text-align: center;  margin-bottom: 5px; color: red; display:none>";
        _html +=
            "<br/><label id='errorMessage' style='font-size: 60%; color: red;'>Wrong values or JSON not well formed</label>";
        _html +=
            "</div>";
        _html +=
            "<div id='button-wrapper' style='text-align: center; margin-top: 5px;'><button id='mlj-cameraPosition-dialog-button'>Confirm</button></div></div>";
        _dialogCameraPosition.appendContent(_html);

        function init() {
            var home = new component.Button({
                tooltip: "Home",
                icon: "img/icons/home.png",
            });

            var doc = new component.Button({
                tooltip: "Go to the documentation page",
                icon: "img/icons/question.png",
                right: true,
            });

            var git = new component.Button({
                tooltip: "Go to the Github page",
                icon: "img/icons/github.png",
                right: true,
            });

            _toolBar.add(home);
            _toolBar.add(doc, git);

            doc.onClick(function () {
                var win = window.open("./doc/html/", "_blank");
                win.focus();
            });

            git.onClick(function () {
                var win = window.open(
                    "https://github.com/SpineView1/ivd",
                    "_blank"
                );
                win.focus();
            });

            home.onClick(function () {
                window.location.href = "https://spineview.upf.edu";
            });
        }

        this._make = function () {
            _toolBar.$.attr("id", "mlj-scenebar-widget");
            return _toolBar.$;
        };

        init();

        MLJ.gui.Widget.call(this);
    };

    MLJ.extend(MLJ.gui.Widget, _SceneBar);

    //Install widget
    MLJ.gui.installWidget("SceneBar", new _SceneBar());
})(MLJ.gui.component);
