import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';



import * as THREE from 'three';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {


    @ViewChild('ttref', { read: ElementRef, static: true }) ttref: ElementRef;


    container;
    camera;
    scene;
    raycaster;
    renderer;
    mouse = new THREE.Vector2();
    INTERSECTED;
    radius = 100;
    theta = 0;

    constructor() { }

    ngOnInit(): void {
        // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        // Add 'implements OnInit' to the class.

        this.init();
        setInterval(() => {
            this.animate();
        }, 1);
    }


    private init() {
        this.container = document.createElement('div');
        document.body.getElementsByClassName('id')[0].appendChild(this.container);
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0f0f0);
        let light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        this.scene.add(light);
        let geometry = new THREE.BoxBufferGeometry(20, 20, 20);
        for (let i = 0; i < 2000; i++) {
            let object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            object.rotation.x = Math.random() * 2 * Math.PI;
            object.rotation.y = Math.random() * 2 * Math.PI;
            object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            this.scene.add(object);
        }
        this.raycaster = new THREE.Raycaster();
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        // document.addEventListener('mousemove', this.onDocumentMouseMove, false);
        //
        // window.addEventListener('resize', this.onWindowResize, false);
    }
    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    private onMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    }
    //
    private animate() {
        requestAnimationFrame(this.animate);
        this.render();
    }
    private render() {
        this.theta += 0.1;
        this.camera.position.x = this.radius * Math.sin(THREE.Math.degToRad(this.theta));
        this.camera.position.y = this.radius * Math.sin(THREE.Math.degToRad(this.theta));
        this.camera.position.z = this.radius * Math.cos(THREE.Math.degToRad(this.theta));
        this.camera.lookAt(this.scene.position);
        this.camera.updateMatrixWorld();
        // find intersections
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObjects(this.scene.children);
        if (intersects.length > 0) {
            if (this.INTERSECTED != intersects[0].object) {
                if (this.INTERSECTED) { this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex); }
                this.INTERSECTED = intersects[0].object;
                this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
                this.INTERSECTED.material.emissive.setHex(0xff0000);
            }
        } else {
            if (this.INTERSECTED) { this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex); }
            this.INTERSECTED = null;
        }
        this.renderer.render(this.scene, this.camera);
    }

}
