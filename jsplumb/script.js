var overlay = ["Arrow", {
    foldback: 1,
    width: 10,
    length: 15
}];
var endpoint = ["Rectangle", {
    width: 30,
    height: 30,
}];

var endpointStyle = {
    fill: "#00b8ff",
    outlineStroke: "black",
    outlineWidth: 4
};

var endpointHoverStyle = {
    fill: "green",
    outlineStroke: "red",
    outlineWidth: 6
};

var connectorStyle = {
    strokeWidth: 5,
    stroke: 'red'
};

var connectorHoverStyle = {
    strokeWidth: 5,
    stroke: 'black'
};

var connector = ["Flowchart", {
    stub: 30,
    alwaysRespectStubs: true,
    gap: 0,
    midpoint: 0.25,
    cornerRadius: 5
}];

var commonEndpoint = {
    endpoint: endpoint,
    paintStyle: endpointStyle,
    hoverPaintStyle: endpointHoverStyle,
    connector: connector,
    connectorStyle: connectorStyle,
    connectorHoverStyle: connectorHoverStyle,
    connectorOverlays: [overlay],
};

var service = {
    zoom: {
        scale: 1,
        delta: 0.03,
        min: 0.3,
        max: 2.1,
    }
};

jsPlumb.bind("ready", function () {
    jsPlumb.setContainer('container');
    jsPlumb.draggable(['window1', 'window2', 'window3'], {
        containment: true,
        grid: [10, 10],
        start: function (params) {
            console.log('start', params);
        },
        stop: function (params) {
            console.log('drop', params);
        }
    });

    window.addEventListener("wheel", function (event) {
        if (event.deltaY < 0) setZoom(service.zoom.scale + service.zoom.delta, event);
        else setZoom(service.zoom.scale - service.zoom.delta, event);
    });

    jsPlumb.bind("connection", function (info, originalEvent) {
        console.log('connection', info);
        console.log(originalEvent);
    });

    jsPlumb.bind("connectionMoved", function (info, originalEvent) {
        console.log('connectionMoved', info);
        console.log(originalEvent);
    });

    jsPlumb.addEndpoint('window1', {
        isSource: true,
        anchor: [0.25, 1, 0, 1],
    }, commonEndpoint);

    jsPlumb.addEndpoint('window2', {
        isTarget: true,
        anchor: 'Left',
    }, commonEndpoint);

    jsPlumb.addEndpoint('window3', {
        isTarget: true,
        anchor: 'Left',
    }, commonEndpoint);

    jsPlumb.connect({
        source: 'window1',
        target: 'window2',
        anchors: [[0.25, 1, 0, 1], "Left"],
        endpoint: endpoint,
        endpointStyle: endpointStyle,
        endpointHoverStyle: endpointHoverStyle,
        connector: connector,
        paintStyle: connectorStyle,
        hoverPaintStyle: connectorHoverStyle,
        overlays: [overlay]
    });
});

function setZoom(scale, event) {
    if (scale < service.zoom.min || scale > service.zoom.max) return;
    var el = jsPlumb.getContainer();
    var rect = el.getBoundingClientRect();
    var transformOrigin = [Math.round(rect.width / 2), Math.round(rect.height / 2)];

    if (event) {
        // find current location on screen
        var xScreen = event.pageX - rect.left;
        var yScreen = event.pageY - rect.top;


        // find current location on the container at the current scale
        service.zoom.xOnContainer = service.zoom.xOnContainer + ((xScreen - service.zoom.xOnScreen) / service.zoom.scale);
        service.zoom.yOnContainer = service.zoom.yOnContainer + ((yScreen - service.zoom.yOnScreen) / service.zoom.scale);

        // determine the location on the screen at the new scale
        var xNew = (xScreen - service.zoom.xOnContainer) / scale;
        var yNew = (yScreen - service.zoom.yOnContainer) / scale;

        // save the current screen location
        service.zoom.xOnScreen = xScreen;
        service.zoom.yOnScreen = yScreen;

        transformOrigin = [xNew, yNew];
    }

    var p = ["webkit", "moz", "ms", "o"],
        // s = "scale(" + scale + ")" + ' translate(' + xScreen + 'px, ' + yScreen + 'px' + ')',
        s = "scale(" + scale + ")",
        oString = transformOrigin[0] + "px " + transformOrigin[1] + "px";

    for (var i = 0; i < p.length; i++) {
        // el.style[p[i] + "TransformOrigin"] = oString;
        el.style[p[i] + "Transform"] = s;
    }

    // el.style["transformOrigin"] = oString;
    el.style["transform"] = s;

    service.zoom.scale = scale;
    jsPlumb.setZoom(scale);
}
