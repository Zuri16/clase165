AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 2000)
    },
    shootEnemyBullet: function () {

        //obtener todos los enemigos usando el nombre de la clase
        var els = document.querySelectorAll(".enemy");

        for (var i = 0; i < els.length; i++) {

            //Entidad de la bala del enemigo
            var enemyBullet = document.createElement("a-entity");

            enemyBullet.setAttribute("geometry", {
                primitive: "sphere",
                radius: 0.1,
            });

            enemyBullet.setAttribute("material", "color", "#282B29");

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);

            //Three.js Vector Variables
            var vector1 = new THREE.Vector3()
            var vector2 = new THREE.Vector3()

            //Obtener la posición del enemigo y jugador usando el método Three.js 
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D
            enemy.getWorldPosition(vector1)
            player.getWorldPosition(vector2)

            //Establecer la velocidad y su dirección
            var vectorResultado=new THREE.Vector3()
            vectorResultado.subVectors(vector1, vector2).normalize()
            enemyBullet.setAttribute("velocity", vectorResultado.multiplyScalar(10))
            
            //Establecer el atributo del cuerpo dinámico
            enemyBullet.setAttribute("dynamic-body", {
                shape:"sphere",
                mass:"0"
            })

            //Obtener atributo de texto
            var vidas=document.querySelector("#countLife")
            var vidaTexto=parseInt(vidas.getAttribute("text").value)

            //Evento de colisión con las balas enemigas
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    //Agrega las condiciones aquí
                    if (vidaTexto > 0){
                        vidaTexto -=1
                        vidas.setAttribute("text", {
                            value:vidaTexto
                        })
                    }
                    if(vidaTexto <= 0){
                        var textOver= document.querySelector("#over")
                        textOver.setAttribute("visible", true)
                        var tanques = document.querySelectorAll(".enemy");
                        for(var i=0; i<tanques.length; i++){
                            scene.removeChild(tanques[i])
                        }
                    }

                }
            });

        }
    },

});
