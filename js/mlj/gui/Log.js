(function (component) {

    var _Log = function () {
        var _this = this;

        // Prepare the modal content
        var modalContent = "<img src='IVDspineView-1.png' style='width:100%;'>"; // Customize this content
        
        // Create the modal but don't show it yet
        var _$logModal = $('<div id="logModal" title="Log Details">' + modalContent + '</div>').hide();
        $('body').append(_$logModal);

        // Button setup to trigger the modal
        var _$logButton = $('<button/>', {
            type: 'button',
            class: 'btn btn-primary',
            text: 'Legend',
        }).click(function () {
            _$logModal.dialog({
                modal: true,
                width: '920px', // or 'auto'
                height: 'auto',
                open: function() {
                    // Optional: Any action to take when the modal opens
                },
                close: function() {
                    // Optional: Any action to take when the modal closes
                }
            }); 
        });

        // Append the button to the widget wrapper
        this._make = function () {
            var $wrap = $('<div/>').attr("id", "mlj-log-widget");
            $wrap.append(_$logButton);
            return $wrap;
        };
    };

    MLJ.extend(MLJ.gui.Widget, _Log);
    MLJ.gui.installWidget("Log", new _Log());

})(MLJ.gui.component);
