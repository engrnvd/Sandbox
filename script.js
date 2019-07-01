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

jsPlumb.bind("ready", function () {
    jsPlumb.setContainer('container');
    jsPlumb.draggable(['window1', 'window2', 'window3'], {
        containment: true,
        grid: [10, 10]
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
