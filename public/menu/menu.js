function getmenus() {     
					$("#spinsavemenu").show()

					var cont = 0;
					$("#menu-to-edit li").each(function(index) {
						var dept = 0;
						for (var i = 0; i < $("#menu-to-edit li").length; i++) {

							var n = $(this).attr("class").indexOf("menu-item-depth-" + i);
							if (n != -1) {
								dept = i;
							}
						};

						var textoiner = $(this).find(".item-edit").context.outerText;

						var textoexplotado = textoiner.split("|");
						var padre = 0;
						if (textoexplotado.length == 7) {
							padre = textoexplotado[5]
						}

						var id = this.id.split("-");

						arraydata.push({
							depth : dept,
							id : id[2],
							parent : padre,
							sort : cont
						});
						cont++;
					});
					actualizarmenu();
				}

				function addcustommenu() {
					$("#spincustomu").show();

					$.ajax({
						data : {
							labelmenu : $("#custom-menu-item-name").val(),
							linkmenu : $("#custom-menu-item-url").val(),
							idmenu : $("#idmenu").val()
						},

						url : addcustommenu,
						type : 'POST',
						success : function(response) {
							$("#spincustomu").hide();
							window.location = "";

						}
					});
				}

				function updateitem(id) {

					var label = $("#idlabelmenu_" + id).val()
					var clases = $("#clases_menu_" + id).val()
					var url = $("#url_menu_" + id).val()
					$.ajax({
						data : {
							label : label,
							clases : clases,
							url : url,
							id : id
						},

						url :updateitem,
						type : 'POST',
						success : function(response) {

							$("#menutitletemp_" + id).val(label)

							console.log("aqu llega")
							//$("#spinsavemenu").hide();
						}
					});
				}

				function actualizarmenu() {

					$.ajax({
						dataType : "json",
						data : {
							arraydata : arraydata,
							menuname : $("#menu-name").val(),
							idmenu : $("#idmenu").val()
						},

						url : generatemenucontrol,
						type : 'POST',
						success : function(response) {

							console.log("aqu llega")
							$("#spinsavemenu").hide();
						}
					});
				}

				function deleteitem(id) {
					$.ajax({
						dataType : "json",
						data : {

							id : id
						},

						url :deleteitemmenu,
						type : 'POST',
						success : function(response) {

						}
					});
				}

				function deletemenu() {

					var r = confirm("Do you want to delete this menu ?");
					if (r == true) {
						$.ajax({
							dataType : "json",

							data : {

								id : $("#idmenu").val()
							},

							url : deletemenug,
							type : 'POST',
							success : function(response) {

								if (!!response.error) {
									alert(response.resp)
								}

							}
						});

					} else {
						return false;
					}

				}

				function createnewmenu() {

					if (!!$("#menu-name").val()) {
						$.ajax({
							dataType : "json",

							data : {
								menuname : $("#menu-name").val(),
							},

							url :createnewmenu,
							type : 'POST',
							success : function(response) {

								window.location = menuw+"?menu=" + response.resp

							}
						});
					} else {
						alert("Enter menu name!")
						$("#menu-name").focus();
						return false;
					}

				}
