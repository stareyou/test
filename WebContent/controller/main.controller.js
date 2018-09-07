sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/ColumnListItem",
], function(Controller,ColumnListItem) {
	"use strict";

	return Controller.extend("z7.controller.main", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf z7test002.view.main
		 */
		onInit: function() {
		//debugger;
/*					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("navToMain").attachPatternMatched(this);*/
		
		this.pernr = "O1000010";
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf z7test002.view.main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf z7test002.view.main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf z7test002.view.main
		 */
		//	onExit: function() {
		//
		//	}
		handSignIn: function(oEvt){
			
			var signUrl = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Attendance.WebAPI/Attendance/SignIn";
			var sign_data = {
				"EmployeeCode": this.pernr,
				//# 员工号
				"Latitude": "39.92830449291655",
				//# 纬度
				"Logitude": "116.4400697910559",
				//# 经度
				"SignTime": "",
				//# time,                // # 签到时间
				"ProjectId": "2628a3fd-45ae-4e8a-9712-f198913a4f7e",
				//# 'e125d961-1762-4591-b36a-035156fec590',  # 项目ID
				"Address": "朝阳门SOHO写字楼东68米",
				//# 签到位置
				"City": "北京市",
				//# 城市
				"formatted_address": "北京市东城区南竹杆胡同5号楼",
				"DeviceId": "9CA912F5-ECC3-4203-8075-471A86037471"
			};
			
			var queryUrl = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Attendance.WebAPI/Attendance/GetAttendanceRecordList";
			var queryData = {
					"StartPage": "1",
					"RowCount": "500",
					"EmployeeCode": this.pernr,
					"StartTime": "2018/09/04",
					"EndTime": "2018/09/30"
				};
			
			jQuery.when(jQuery.ajax({
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
					sap.m.MessageToast.show(data.Msg);
				},
				error: function(XMLHttpRequest, Error, F) {
					debugger;
				}
			})).then(jQuery.ajax({
				url: queryUrl,
				async: false,
				type: "POST",
				data: queryData,
				beforeSend: function(request) {
					debugger;
					request.setRequestHeader("token", window.sessionStorage.token);
				}.bind(this),
				success: function(data, textStatus, jqXHR) {
					debugger;
					if(data.IsSuccessful){
						this.bindItems(data.Data.Data);
					};
					
				}.bind(this),
				error: function(XMLHttpRequest, Error, F) {
					debugger;
				}
			})
			);
			
			
		},
		
		
		
		bindItems:function(aItems){
			//debugger;
			var oTable = this.getView().byId("table");
			
			var oRowsModel = new sap.ui.model.json.JSONModel();
			oRowsModel.setData(aItems);
			oTable.setModel(oRowsModel);
			
			oTable.bindItems("/",new ColumnListItem({
				type:"Detail",
				press:"",
				detailPress:"",
				cells:[
					//new sap.m.Text({text : "{SignInTime}"}),
					/*new sap.m.Text({text : {path:"SignInTime",type: 'sap.ui.model.type.Date',formatOptions:{
						source:{
							pattern:'yyyy-MM-ddTHH:mm:ss.AAAZ'
							},
							pattern:'yyyy-MM-ddTHH:mm:ss.AAAZ'
						} }}),*/
						
					new sap.m.Text({text:{parts:['SignInTime'],formatter:this.formatDateTime}}),
				/*	new sap.m.ObjectStatus({text : {parts:['SignInTime'], type: 'sap.ui.model.type.Date',
						formatter: this.formatDateTime,
						formatOptions:{
						source:{
							pattern:'MM/dd/yyyyTHH:mm:ss'
							},
							pattern:'yyyy年MM月dd日HH时mm分ss秒'
						}},
						state: 'Error'
					}),*/
					new sap.m.Text({text : "{SignInAddress}"}),
					new sap.m.Text({text : "{ProjectName}"}),
				]
				
			}));
		},
		formatDateTime: function(input){debugger;
		if(input){
			
			 var date = new Date(input)
			 var datestring = date.toLocaleDateString()+'T'+date.toLocaleTimeString().substring(0,8);
			 return date.toLocaleDateString()+'日'+date.getHours() +':'+ date.getMinutes() +':'+ date.getSeconds() ;
	
		};

		},
		
		onQuery: function(oEvt){
			//debugger;
			var queryUrl = "/ztest02/proxy/http/202.98.157.41:2015/7lego.Attendance.WebAPI/Attendance/GetAttendanceRecordList";
			var queryData = {
					"StartPage": "1",
					"RowCount": "500",
					"EmployeeCode": this.pernr,
					"StartTime": "2018/08/06",
					"EndTime": "2018/09/30"
				};
			
			jQuery.ajax({
				url: queryUrl,
				async: false,
				type: "POST",
				data: queryData,
				beforeSend: function(request) {
					//debugger;
					request.setRequestHeader("token", window.sessionStorage.token);
				}.bind(this),
				success: function(data, textStatus, jqXHR) {
					//debugger;
					if(data.IsSuccessful){
						this.bindItems(data.Data.Data);
					};
					
				}.bind(this),
				error: function(XMLHttpRequest, Error, F) {
					debugger;
				}
			})
		}
		
	});

});