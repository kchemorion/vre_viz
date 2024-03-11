(function (component) {

    var _Log = function () {
        // Define modal content with a custom header bar for the close button
        var modalContent = `
         <div style="position: absolute; top: 0; right: 0; height: 40px; width: 100%; border-bottom: 1px solid #ccc;">
                <button type="button" class="modal-close-btn" style="position: absolute; top: 5px; right: 10px; border: 1px solid #aaa; background: #fff; font-size: 1rem; cursor: pointer; color: #000; padding: 5px 10px; border-radius: 5px;">&times;</button>
            </div>
            <img src='IVDspineView-1.png' style='width:100%; display: block; margin-top: 40px;'>
        `;

        // Create the modal with relative positioning
        var _$logModal = $('<div id="logModal" style="position: relative; padding-top: 40px;">' + modalContent + '</div>').hide();
        $('body').append(_$logModal);

        // Setup the button to trigger the modal
        var _$logButton = $('<button/>', {
            type: 'button',
            class: 'btn btn-primary',
            text: 'Legend',
        }).click(function () {
            _$logModal.dialog({
                modal: true,
                width: '920px',
                height: 'auto',
                autoOpen: false,
                open: function(event, ui) {
                    $('.ui-dialog-titlebar').hide();
                }
            });

            _$logModal.dialog('open');
        });

        // Append the button to the widget wrapper
        this._make = function () {
            var $wrap = $('<div/>').attr("id", "mlj-log-widget");
            $wrap.append(_$logButton);
            return $wrap;
        };

        // Add functionality to close the modal when the custom close button is clicked
        _$logModal.on('click', '.modal-close-btn', function() {
            _$logModal.dialog('close');
        });
    };

    MLJ.extend(MLJ.gui.Widget, _Log);
    MLJ.gui.installWidget("Log", new _Log());

})(MLJ.gui.component);
