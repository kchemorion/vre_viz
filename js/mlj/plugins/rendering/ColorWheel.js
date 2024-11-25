MLJ.ColorMode = {};

MLJ.ColorMode.Uniform = 0;
MLJ.ColorMode.Face = 1;
MLJ.ColorMode.Vertex = 2;

(function (plugin, core, scene) {
    console.log("[ColorWheel] Starting plugin initialization");

    var DEFAULTS = {
        diffuse: new THREE.Color('#A0A0A0'),
        mljColorMode: 0  // MLJ.ColorMode.Uniform
    };

    var plug = new plugin.Rendering({
        name: "ColorWheel",
        tooltip: "Change mesh color",
        icon: "img/icons/color.png",
        toggle: true,
        on: true
    }, DEFAULTS);

    var meshColors = {
        '_AF': '#FF00BA',   // Pink (RGB 255, 0, 186)
        '_NP': '#0095D0',   // Blue (RGB 0, 149, 208)
        '_CEP': '#00B094',  // Teal (RGB 0, 176, 148)
        'default': '#A0A0A0' // Gray
    };

    function updateLayerColor(layer, color) {
        if (!layer) {
            console.error("[ColorWheel] ERROR: Layer is null or undefined");
            return;
        }

        console.log("[ColorWheel] Updating color for layer:", layer.name);
        
        try {
            // Set up parameters first
            var params = {
                diffuse: new THREE.Color(color),
                mljColorMode: 0  // Uniform mode
            };
            layer.overlaysParams.set("ColorWheel", params);

            // Get and enable Filled plugin
            var filledPlugin = MLJ.core.plugin.Manager.getRenderingPlugins().getByKey("Filled");
            if (!filledPlugin) {
                console.error("[ColorWheel] ERROR: Could not find Filled plugin");
                return;
            }

            // Enable Filled if needed
            if (!layer.properties.getByKey("Filled")) {
                console.log("[ColorWheel] Enabling Filled plugin");
                layer.properties.set("Filled", true);
                filledPlugin._applyTo(layer, true);
            }

            // Ensure mesh is visible
            var filledMesh = layer.overlays.getByKey("Filled");
            if (filledMesh) {
                filledMesh.visible = true;
                if (filledMesh.material) {
                    filledMesh.material.needsUpdate = true;
                }
            }
        } catch (error) {
            console.error("[ColorWheel] ERROR in updateLayerColor:", error);
        }
    }

    function getColorForFile(fileName) {
        console.log("[ColorWheel] Getting color for file:", fileName);
        
        for (var key in meshColors) {
            if (key !== 'default' && fileName.indexOf(key) !== -1) {
                console.log("[ColorWheel] Found color match:", key, "->", meshColors[key]);
                return meshColors[key];
            }
        }
        
        return meshColors.default;
    }

    function handleMeshLoad(meshFile) {
        console.log("[ColorWheel] Handling mesh load for:", meshFile.name);
        
        // Set initial parameters
        meshFile.overlaysParams.set("ColorWheel", DEFAULTS);
        
        // Wait for layer to be fully initialized
        setTimeout(function() {
            var layer = scene.getLayerByName(meshFile.name);
            if (layer) {
                var color = getColorForFile(layer.name);
                updateLayerColor(layer, color);
            }
        }, 100);
    }

    plug._init = function (guiBuilder) {
        console.log("[ColorWheel] Initializing plugin");
        
        $(document).on("MeshFileOpened", function(event, meshFile) {
            console.log("[ColorWheel] MeshFileOpened event for:", meshFile.name);
            handleMeshLoad(meshFile);
        });

        $(document).on("SceneLayerAdded", function(event, layer) {
            console.log("[ColorWheel] SceneLayerAdded event for:", layer.name);
            if (!layer.overlaysParams.getByKey("ColorWheel")) {
                var color = getColorForFile(layer.name);
                updateLayerColor(layer, color);
            }
        });

        console.log("[ColorWheel] Plugin initialization complete");
    };

    plug._applyTo = function (layer, on) {
        if (on && layer) {
            var color = getColorForFile(layer.name);
            updateLayerColor(layer, color);
        }
    };

    plugin.Manager.install(plug);
    console.log("[ColorWheel] Plugin installed");

})(MLJ.core.plugin, MLJ.core, MLJ.core.Scene);
