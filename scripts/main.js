const ui = require("four_ui-lib/four");

const core = require("pictologic/core");

var ptl;

ui.addMenuButton("$pictologic", "paste", () => {
	ptl.show();
});

ui.onLoad(() => {
	// Add button in Schematics dialog
	Vars.ui.schematics.buttons.button("$pictologic", Icon.paste, () => {
		ptl.show();
	});

	ptl = new BaseDialog("$pictologic");
	ptl.cont.add("$howtouse");
	ptl.cont.row();
	ptl.cont.add("$h1");
	ptl.cont.row();
	ptl.cont.add("$h2");
	ptl.cont.row();
	ptl.cont.add("$h3");
	ptl.cont.row();
	ptl.cont.add("$h6");
	ptl.cont.row();
	ptl.cont.add("$h4");
	ptl.cont.row();
	ptl.cont.add("$h5");
	ptl.cont.row();

	ptl.cont.button("$SelectImage", () => {
		Vars.platform.showFileChooser(false, "png", file => {
			try {
				const bytes = file.readBytes();
				core.image = new Pixmap(bytes);
			} catch (e) {
				ui.showError("$errrol", e);
			}
		});
	}).size(240, 50);
	ptl.cont.row();

	ptl.cont.label(() => core.stage).center();

	ptl.addCloseButton();
	ptl.buttons.button("$settings", Icon.settings, () => {
		core.settings.show();
	});
	ptl.buttons.button("$Exportpic", Icon.export, () => {
		new java.lang.Thread(() => {
			try {
				core.export(core.image);
				ptl.hide();
			} catch (e) {
				Core.app.post(() => {
					ui.showError("$erosche", e);
					core.stage = "";
				});
			}
		}, "$PicToCanvasworker").start();
	}).disabled(() => !core.image || core.stage != "");

	core.build();
});
