// simple-babylonjs: functions designed to make it easier for beginners to learn to code in BabylonJS
// by hiding some of BabylonJS' complexity


// ---- Basic functions to get a postcard up and running ------------------

function simpleSetUp () {
    // simpleSetUp: Hides away details that beginning users don't need to see
    // Also allows teachers/schools a simple hook for globally customizing postcards
    
    var canvas = document.getElementById("renderCanvas"); // Get the canvas element 
    var engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine

    // Cheat: for now, return the engine
    // Clean this up so I'm returning an object that contains the engine,
    // then fix the next two functions below
    return engine;
};


function simpleScene (engine) {
    // Set up a basic scene, including a camera and lighting
    
    var scene = new BABYLON.Scene(engine);
    scene.createDefaultCameraOrLight(true, true, true);
    scene.cameras[0].radius = 60;                   // Move the camera back so it's easier to see everything in the scene
    scene.clearColor = BABYLON.Color3.White();       // Set the scene's background color
    return scene;
};


function simpleStart (engine, scene) {
    // "Render" the scene so we can see it
    engine.runRenderLoop( function(){ scene.render(); } );

    // Set it up so that if the user resizes the browser, BabylonJS will update the screen
    window.addEventListener('resize', function(){ engine.resize(); } );
};


// ---- Basic features to add stuff to your postcard ------------------


function simpleColor ()  {
    return "black";
};

/**  simpleTextBlock: create a simple text label
*/
function simpleTextBlock(text, options, scene) {

    var x = (options.x === undefined) ?   0     : options.x;
    var y = (options.y === undefined) ?   0     : options.y;
    var z = (options.z === undefined) ?   0     : options.z;

// console.log(x);

// Create the ground/plane and give it a dynamic texture, to which the TextBlock will be attached 
    var ground =  BABYLON.MeshBuilder.CreateGround("ground", {height: 26, width: 26, subdivisions: 2}, scene);     
    ground.position = new BABYLON.Vector3(x, options.y, options.z);
    var rotation = (options.rotation === undefined) ? {x: 4.6, y: 0, z: 0}  : options.rotation;
    ground.rotation = new BABYLON.Vector3(rotation.x, rotation.y, rotation.z);
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(ground, 1024, 1024);    

    // Create the TextBlock and attach it 
    var guiText = new BABYLON.GUI.TextBlock("label" + text);
    guiText.text = text;
    guiText.color =     (options.color === undefined) ?     "black"     : options.color;
    guiText.fontSize =  (options.fontSize === undefined) ?  "120px"     : options.fontSize;
    guiText.width =     (options.width === undefined) ?     "950px"     : options.width;
    guiText.height =    (options.height === undefined) ?    "350px"     : options.height;
    // Other options I might add:
    // guiText.textWrapping= true;
    // guiText.lineSpacing = percentage;
    advancedTexture.addControl(guiText);

    return guiText;
};



// Now what I need to do is add the option for image, which then does this:
// var grass1 = new BABYLON.StandardMaterial("grass1", scene);
// grass1.emissiveTexture = new BABYLON.Texture("textures/grass.png", scene);
//And also make sure that EmissiveTexture is what I want


function simpleSphere (name, options, scene) {
// simpleSphere: helper function to hide the details of creating a sphere and the material that covers it
    var x = (options.x === undefined) ?   0     : options.x;
    var y = (options.y === undefined) ?   0     : options.y;
    var z = (options.z === undefined) ?   0     : options.z;
    var diameter =  (options.diameter === undefined) ?      1                               : options.diameter;
    var color =     (options.color === undefined) ?         new BABYLON.Color3.Black()      : options.color;
    var ball = BABYLON.MeshBuilder.CreateSphere(name, {diameter: diameter}, scene);
    ball.position = new BABYLON.Vector3(x, y, z); 

    // If they provided a material, use that; otherwise, create a material using the color they specified
    if (options.material) {
        ball.material = options.material;
    } else {
        var myMaterial = new BABYLON.StandardMaterial("myMaterial", scene);
        myMaterial.diffuseColor =  color;
        ball.material = myMaterial;
    };
    return ball;
};



// NOTE: check to make sure that this is still needed and that there isn't an easier way to do this
function simpleAnimation (name, methodToAnimate, numberFrames, timeline)  {
    var animation = new BABYLON.Animation(name, methodToAnimate, numberFrames, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    var keys = [];
    for (let i = 0; i < timeline.length; i++) {
        keys.push(timeline[i]);
    };
    animation.setKeys(keys);
    return animation;
};
