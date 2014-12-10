// ViewDot.js
define(["alfrid/View", "alfrid/Mesh", "alfrid/GLTool", "text!../assets/shaders/general.vert", "text!../assets/shaders/general.frag"], function(View, Mesh, GLTool, strVertShader, strFragShader) {
	var ViewDot = function() {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.scale = 1;
		this.alpha = 1;
		View.call(this, strVertShader, strFragShader);
	};

	var p = ViewDot.prototype = new View();
	var s = View.prototype;

	p._init = function() {
		var positions = [];
		var coords = [];
		var indices = [0, 1, 2, 0, 2, 3];
		var size = 2;

		positions.push([-size,	-size,  0]);
		positions.push([ size,	-size,  0]);
		positions.push([ size,	 size,  0]);
		positions.push([-size,	 size,  0]);

		coords.push([0, 0]);
		coords.push([1, 0]);
		coords.push([1, 1]);
		coords.push([0, 1]);

		this.mesh = new Mesh(positions.length, indices.length, GLTool.gl.TRIANGLES);
		this.mesh.bufferVertex(positions);
		this.mesh.bufferTexCoords(coords);
		this.mesh.bufferIndices(indices);
	};

	p.render = function(texture) {
		if(!this.shader.isReady()) return;
		// console.log(this.shader);
		this.shader.bind();
		this.shader.uniform("texture", "uniform1i", 0);
		this.shader.uniform("position", "uniform3fv", [this.x, this.y, this.z]);
		// this.shader.uniform("position", "uniform3fv", [0, 0, 0]);
		this.shader.uniform("scale", "uniform3fv", [this.scale, this.scale, this.scale]);
		// this.shader.uniform("scale", "uniform3fv", [1, 1, 1]);
		this.shader.uniform("alpha", "uniform1f", 1);
		
		texture.bind(0);
		GLTool.draw(this.mesh);
	};

	return ViewDot;
	
});