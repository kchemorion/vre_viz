/**
 * @file Defines and installs the Layers pane widget that provides the features of
 * select and show/hide layers
 * @author Stefano Gabriele
 */
(function (component) {
    
    /**         
     * @class Create a new Layers Pane widget
     * @augments  MLJ.gui.Widget
     * @private
     * @memberOf MLJ.gui.widget
     * @author Stefano Gabriele 
     */
    var _LayersPane = function () {

        var _$layers = $('<div id="mlj-layers" class="ui-widget-content"></div>');

        var _selectedName;

        function select(name) {
            // Just one
            var $sel = _$layers.find("[class*='selected']");
            $sel.each(function (key, value) {
                $(value).removeClass("selected");
            });

            // Just one
            $sel = _$layers.find("[name='" + name + "']");
            $sel.each(function (key, value) {
                $sel = $(value).addClass("selected");
                _selectedName = name;
            });
        }

        function initEventHandlers() {
            // On new mesh added
            $(document).on("SceneLayerAdded",
                    function (event, mesh) {
                        // Add item to layers pane widget
                        MLJ.widget.LayersPane.addLayerHandler(mesh.name);
                        MLJ.gui.getWidget("Info").updateInfo(mesh);
                    });

            $(document).on("SceneLayerSelected",
                    function (event, mesh) {
                        MLJ.gui.getWidget("Info").updateInfo(mesh);
                        select(mesh.name);
                    });

            $(document).on("SceneLayerUpdated",
                    function (event, mesh) {
                        // UPDATE INFO                        
                        if (_selectedName === mesh.name) {
                            MLJ.gui.getWidget("Info").updateInfo(mesh);
                        }
                    });
                    
            $(document).on("SceneLayerRemoved",
                function (event, mesh) {
                    MLJ.widget.LayersPane.removeLayer(mesh.name);
                    MLJ.gui.getWidget("Info").clear();
                });
        }
        
        /**
         * Returns the name of the selected layer
         * @returns {String} The name of the selected layer
         * @author Stefano Gabriele
         */
        this.getSelectedName = function () {
            return _selectedName;
        };
        
        /**          
         * @author Stefano Gabriele
         */
        this._make = function () {//build function 
            initEventHandlers();
            return _$layers;
        };
        
        /**
         * Adds a new layer with renaming based on filename endings
         * @param {String} name The name of the layer
         * @author Stefano Gabriele
         */
        this.addLayerHandler = function (name) {
            // Define mapping for filename endings to new names
            var renamingMap = {
                "AF.stl": "Annulus Fibrosus",
                "NP.stl": "Nucleus Pulposus",
                "CEP.stl": "Cartilage EndPlate"
            };

            // Check if the name contains any of the specified endings
            for (var ending in renamingMap) {
                if (name.endsWith(ending)) {
                    // Update the name with the corresponding value from the mapping
                    var newName = renamingMap[ending];
                    break; // Exit the loop after the first match
                }
            }

            // If no matching ending is found, proceed with the original name
            var finalName = newName || name;

            var $wrap = $('<div class="mlj-layers-entry" name="mlj-wrap-' + finalName + '"></div>')
                    .css({position: "relative", width: "100%"});
            var $layer = $('<div class="mlj-layer" name="' + finalName + '">' + finalName + '</div>')
                    .css({position: "absolute"});
            var $eye = $('<div class="mlj-eye show"></div>')
                    .css({position: "absolute"});
            $wrap.append($eye).append($layer);
            _$layers.append($wrap);
            select(finalName);

            $layer.click(function () {
                if ($layer.attr("name") !== _selectedName) {
                    select(finalName);
                    MLJ.core.Scene.selectLayerByName(name);
                }
            });

            $eye.click(function () {
                if ($eye.hasClass("show")) {
                    $eye.removeClass("show").addClass("hide");
                    MLJ.core.Scene.setLayerVisible(name, false);
                } else {
                    $eye.removeClass("hide").addClass("show");
                    MLJ.core.Scene.setLayerVisible(name, true);
                }
            });
        };

        
        /**
         * Removes a layer
         * @param {String} name The name of the layer to be removed
         * @author Stefano Gabriele
         */
        this.removeLayer = function (name) {
            var $sel = _$layers.find("[name='mlj-wrap-" + name + "']");           
            $sel.remove();          
        };

    };

    MLJ.extend(MLJ.gui.Widget, _LayersPane);

    // Install widget
    MLJ.gui.installWidget("LayersPane", new _LayersPane());

})(MLJ.gui.component);
