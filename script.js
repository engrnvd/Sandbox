var commonOverlay = ["Arrow", {foldback: 1, width: 10, length: 15}];
var commonEndpointOptions = {
    endpoint: ["Rectangle", {
        width: 10,
        height: 10,
        fill: '#00b8ff'
    }],
    paintStyle: {strokeWidth: 5, stroke: '#00b8ff'},
    hoverPaintStyle: {strokeWidth: 5, stroke: '#870000'},
    connector: ["Flowchart", {
        stub: 30,
        alwaysRespectStubs: true,
        gap: 0,
        midpoint: 0.25,
        cornerRadius: 5
    }]
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
        connectorOverlays: [commonOverlay]
    }, commonEndpointOptions);

    jsPlumb.addEndpoint('window1', {
        isSource: true,
        anchor: [1, 0.75, 1, 0],
        connectorOverlays: [commonOverlay]
    }, commonEndpointOptions);

    jsPlumb.addEndpoint('window2', {
        isTarget: true,
        anchor: 'Left',
        connectorOverlays: [commonOverlay]
    }, commonEndpointOptions);

    jsPlumb.addEndpoint('window3', {
        isTarget: true,
        anchor: 'Left',
        connectorOverlays: [commonOverlay]
    }, commonEndpointOptions);

    jsPlumb.connect({
        source: 'window1',
        target: 'window2',
        anchors: [[1, 0.75, 1, 0], "Left"],
        overlays: [commonOverlay]
    }, commonEndpointOptions);
});
