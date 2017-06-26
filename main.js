var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.strokeStyle

var lines = [];
var oldLines = [];

function main() {
    var firstLine = [
        {
            'x': 300,
            'y': 400
        }
        ,
        {
            'x': 1000,
            'y': 400
        }
    ];

    lines.push(firstLine);

    drawLines();
}

var rotationAngle = 45;
function iterate() {
    var newLines = [];

    // start rotation to the right
    rotationAngle = 45;

    for(var i in lines) {
        var originalLine = lines[i];

        var p1 = originalLine[0];
        var p2 = originalLine[1];
        var d = Math.sqrt(Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y));
        // squares. Math.
        var distanceToP2 = Math.sqrt(2 * Math.pow(d/2, 2));

        var r = distanceToP2 / d;

        var p3 = {
            'x': r * p2.x + (1 - r) * p1.x,
            'y': r * p2.y + (1 - r) * p1.y
        };

        // first line takes over p1 of original
        var l1 = [originalLine[0]];

        // rotate p2 around p1
        var l1p2 = rotate_point(p3.x, p3.y, l1[0].x, l1[0].y, rotationAngle);
        l1.push(l1p2);

        // line 2 starts with p2 of line1 and ends with p2 of the original line
        var l2 = [l1p2, originalLine[1]];

        newLines.push(l1);
        newLines.push(l2);

        // alternate rotation angle
        rotationAngle *= -1;
    }

    oldLines = lines;
    lines = newLines;

    drawLines();
}

function rotate_point(pointX, pointY, originX, originY, angle) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
        y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
}

function findMiddle(line) {

    var x = (line[1].x + line[0].x) / 2;
    var y = (line[1].y + line[0].y) / 2;

    return {'x': x, 'y': y};

}

function drawLines() {

    ctx.clearRect(0, 0, 1200, 1200);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fillRect(0, 0, 1200, 1200);
    ctx.beginPath();


    ctx.strokeStyle = '#000';

    ctx.beginPath();
    for(var i in lines) {
        var l = lines[i];

        ctx.moveTo(l[0].x, l[0].y);
        ctx.lineTo(l[1].x, l[1].y);
    }
    ctx.closePath();
    ctx.stroke();
}
