MLJ.ColorMode = {};

MLJ.ColorMode.Uniform = 0;
MLJ.ColorMode.Face = 1;
MLJ.ColorMode.Vertex = 2;

(function (plugin, core, scene) {
    // Define a mapping from file suffixes to colors
    var suffixColors = {
        "_AF.stl": "#FF0000", // Red for _AF.stl
        "_CEP.stl": "#0000FF", // Blue for _CEP.stl
        "_NP.stl": "#00FF00", // Green for _NP.stl
        // Add more suffixes and colors as needed
    };

    // Initialize the plugin with default settings
    var plug = new plugin.Rendering({
        name: "ColorWheel",
        tooltip: "ColorWheel Tooltip",
        icon: "img/icons/color.png",
        global: true
    }, {
        diffuse: new THREE.Color('#A0A0A0'), // Default color if suffix not matched
        mljColorMode: MLJ.ColorMode.Uniform
    });

    // Function to get the color based on the file name suffix
    function getColorFromSuffix(filename) {
        var suffixMatch = filename.match(/(_\w+\.stl|\.stl)$/);
        var suffix = (suffixMatch) ? suffixMatch[0] : null;
        return suffixColors[suffix] || "#A0A0A0"; // Default color if no suffix match
    }

    // Event listener for mesh file opened
    $(document).on("MeshFileOpened", function (event, meshFile) {
        if (meshFile.threeMesh && meshFile.threeMesh.material) {
            const filename = meshFile.fileName;
            const suffix = filename.substring(filename.lastIndexOf('_'));
            const colorHex = suffixColors[suffix] || "#FFFFFF"; // Default color if no suffix match
    
            applyColorToMesh(meshFile.threeMesh, colorHex);
            MLJ.core.Scene.render();
        } else {
            // console.error("MeshFileOpened: Mesh or material not ready.");
            // Consider retry mechanism or further checks
        }
    });
    

    plugin.Manager.install(plug);

})(MLJ.core.plugin, MLJ.core, MLJ.core.Scene);
