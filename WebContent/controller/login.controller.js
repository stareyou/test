sap.ui.define(["sap/ui/core/mvc/Controller"], function(Controller) {
	"use strict";
	var initer = 0;
	return Controller.extend("z7.controller.login", {
		
		onInit: function() {
			if( initer === 1){
				this.getVerifyCode();
			}
			initer = initer + 1;


		},
		onAfterRendering: function() {
		debugger;
			},
		getVerifyCode: function(){
			//https://cors-anywhere.herokuapp.com/
			var url = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Mobile.WebAPI/Account/VerifyCode";
			jQuery.ajax({
				url: url,
				async: false,
				headers: {
					"Accept-Language": "zh-cn",
					"X-Requested-With": "XMLHttpRequest",
					"Content-Type": "application/json; charset=utf-8",
					"Access-Control-Allow-Origin": "GET,POST",
					"Access-Control-Allow-Headers": "*"
				},
				type: "POST",
				dataType: "Text",
				callback: "cb",
				success: function(data, textStatus, jqXHR) {
					this.verifycode = data;
					var base64code = "data:image/png;base64," + data.slice(1, data.length - 1);
					this.getView().byId("VerifyCode").setSrc(base64code);
					console.log(base64code);
				}.bind(this),
				error: function(XMLHttpRequest, Error, F) {
					console.log("Undefined error!!");
				}
			});
			/*	$.post("http://202.98.157.41:2015/7lego.Mobile.WebAPI/Account/VerifyCode",function(data,status){
								alert(status);
							});*/
		},
		
		
		
		
		onAfterRendering: function() {},
		/**
		 *@memberOf z7test002.controller.main
		 */
		presssubmit: function() {
			//This code was generated by the layout editor.
			this.getView().byId("answer").getValue();
			var url = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Mobile.WebAPI/Account/Logon";
			var postdata = {
				"LogonName": "ZGQyTkZPSGhOUkVGM1RVUkZkMk5CUFQxM2Q=",
				"Password": "ZGQyTkVSbmhOYm1ONldsUlNlV05CUFQxM2Q=",
				"VerifyCode": this.getView().byId("answer").getValue(),
				"ExtInfo[CustomerCode]": "CH",
				"ExtInfo[LogonName]": "ZGQyTkZPSGhOUkVGM1RVUkZkMk5CUFQxM2Q=",
				"ExtInfo[ClientId]": "19b564985eacb616282bbd48371f3c5e",
				"ExtInfo[EquipmentModel]": "iPhone5s",
				"ExtInfo[Manufacturer]": "Apple",
				"ExtInfo[System]": "iOS",
				"ExtInfo[Version]": "11.2.5"
			};
			var signUrl = "http://202.98.157.41:2015/7lego.Attendance.WebAPI/Attendance/SignIn";
			var sign_data = {
				"EmployeeCode": "O1000010",
				//# 员工号
				"Latitude": "39.92830449291655",
				//# 纬度
				"Logitude": "116.4400697910559",
				//# 经度
				"SignTime": "",
				//# time,                // # 签到时间
				"ProjectId": "2628a3fd-45ae-4e8a-9712-f198913a4f7e",
				//# 'e125d961-1762-4591-b36a-035156fec590',  # 项目ID
				"Address": "\u671D\u9633\u95E8SOHO\u5199\u5B57\u697C\u4E1C45\u7C73",
				//# 签到位置
				"City": "\u5317\u4EAC\u5E02",
				//# 城市
				"formatted_address": "\u5317\u4EAC\u5E02\u4E1C\u57CE\u533A\u5357\u7AF9\u6746\u80E1\u540C5\u53F7\u697C",
				"DeviceId": "9CA912F5-ECC3-4203-8075-471A86037471"
			};
			var token = null;
			jQuery.when(jQuery.ajax({
				url: url,
				async: false,
				type: "POST",
				data: postdata,
				success: function(data, textStatus, jqXHR) {
					debugger;
					token = jqXHR.getResponseHeader("token");
					jqXHR.setRequestHeader("token", token);
					sessionStorage.setItem("token", token);
				}.bind(this),
				error: function(XMLHttpRequest, Error, F) {
					debugger;
				}
			})).then(jQuery.ajax({
				url: signUrl,
				async: false,
				type: "POST",
				data: sign_data,
				beforeSend: function(request) {
					debugger;
					request.setRequestHeader("token", window.sessionStorage.token);
				}.bind(this),
				success: function(data, textStatus, jqXHR) {
					debugger;
				},
				error: function(XMLHttpRequest, Error, F) {
					debugger;
				}
			}));
		},
		/**
		 *@memberOf z7test002.controller.login
		 */
		handLogin: function(oEvent) {
			//This code was generated by the layout editor.
			this.getView().byId("idAnswer").getValue();
			var url = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Mobile.WebAPI/Account/Logon";
			var postdata = {
				"LogonName": "ZGQyTkZPSGhOUkVGM1RVUkZkMk5CUFQxM2Q=",
				"Password": "ZGQyTkVSbmhOYm1ONldsUlNlV05CUFQxM2Q=",
				"VerifyCode": this.getView().byId("idAnswer").getValue(),
				"ExtInfo[CustomerCode]": "CH",
				"ExtInfo[LogonName]": "ZGQyTkZPSGhOUkVGM1RVUkZkMk5CUFQxM2Q=",
				"ExtInfo[ClientId]": "19b564985eacb616282bbd48371f3c5e",
				"ExtInfo[EquipmentModel]": "iPhone5s",
				"ExtInfo[Manufacturer]": "Apple",
				"ExtInfo[System]": "iOS",
				"ExtInfo[Version]": "11.2.5"
			};
			jQuery.ajax({
				url: url,
				async: false,
				type: "POST",
				data: postdata,
				success: function(data, textStatus, jqXHR) {debugger;
					if(data.IsSuccessful === true){
						sessionStorage.setItem("token", jqXHR.getResponseHeader("token"));
						//alert(data.Message);
						sap.m.MessageToast.show(data.UserName + data.Message);
					//	IsSuccessful:true
					//	LogonName:"O1000010"
					//	Message:"验证成功"
					//	Phone:"18601224658"
					//	PushStatus:true
					//	UserName:"王英"
						var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("navToMain");	
					}else{
						sap.m.MessageToast.show(data.Message);
						this.getVerifyCode();
						this.getView().byId("idAnswer").setValue();
					}
				}.bind(this),
				error: function(XMLHttpRequest, Error, F) {
					alert(Error);
					debugger;
				}
			});


		}
	});
});