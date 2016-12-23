/*globals $cells:true */
/*eslint-env browser, jquery*/
		var donorArray = [];
	var patientArray = [];
	$(document).ready(
	function() {
		jQuery("#donorTable").hide();
		jQuery("#donorId").hide();
		
		jQuery("#patientTable").hide();
		jQuery("#patientId").hide(); 
		jQuery("#resultTableId").hide();
		jQuery("#resultTable").hide(); 
		
		

		$("#myAjaxRequestForm").submit(function(e) {
			e.preventDefault();
		});

		$("#addDonor").click(function(e) {
			var obj = new Object();
			obj.name = jQuery("#name").val();
			obj.address = jQuery("#address").val();
			obj.mobile = jQuery("#mobile").val();
			obj.bloodGroup = jQuery("#bloodGroup").val();
			if(obj.name==""){
				alert("UserName is Mandatory");
				return;
			}
			donorArray.push(obj);
			jQuery("#name").val('');
			jQuery("#address").val('');
			jQuery("#mobile").val('');
			//jQuery("#bloodGroup").val('');
			jQuery("#name").focus();

		});

		$("#addPatient").click(function(e) {

			/*  jQuery("#donorTable").hide();
				jQuery("#donorId").hide(); */
			var obj = new Object();
			obj.name = jQuery("#pname").val();
			obj.address = jQuery("#paddress").val();
			obj.mobile = jQuery("#pmobile").val();
			obj.bloodGroup = jQuery("#pbloodGroup").val();
			if(obj.name==""){
				alert("UserName is Mandatory");
				return;
			}
			patientArray.push(obj);
			jQuery("#pname").val('');
			jQuery("#paddress").val('');
			jQuery("#pmobile").val('');
		//	jQuery("#pbloodGroup").val('');
		jQuery("#pname").focus();

		});

		/*  $("#patientBtn").click(function(e){
			 jQuery("#patientFormId").show();
				jQuery("#patientTable").show();
				jQuery("#patientId").show();
				 jQuery("#donorFormId").hide();
					jQuery("#donorTable").hide();
					jQuery("#donorId").hide();
		 });
		 $("#donorBtn").click(function(e){
			 jQuery("#donorFormId").show();
				jQuery("#donorTable").show();
				jQuery("#donorId").show();
		 }); */

		$("#findCompatability").click(
		function(e) {
			
			jQuery("#resultTableId").show();
			jQuery("#resultTable").show(); 
			var donorRows = [];
			var patientRows = [];
			var $headers = $("th");
			var $rowsD = $("#donorTable tr").each(
			function(index) {
				$cells = $(this).find("td");
				donorRows[index] = {};
				$cells.each(function(cellIndex) {
					donorRows[index][$($headers[cellIndex]).html()] = $(this)
					.html();
				});
			});
			
			var $headers = $("th");
			var $rowsP = $("#patientTable tr").each(
			function(index) {
				$cells = $(this).find("td");
				patientRows[index] = {};
				$cells.each(function(cellIndex) {
					patientRows[index][$($headers[cellIndex]).html()] = $(this)
					.html();
				});
			});
			
			var myObjPatient = {};
			myObjPatient.patientRows = patientRows;

			var myObjDonor = {};
			myObjDonor.donorRows = donorRows;
			//alert(JSON.stringify(myObjDonor));
			//var myarray1 = JSON.stringify(donorArray);
			//var myarray2 = JSON.stringify(patientArray);

			$.post("/pallava_poc/getcompatability", {
				donors : JSON.stringify(myObjDonor),
				patients : JSON.stringify(myObjPatient)
			}, function(e) {

			}, "json").done(function(responseData) {
				//alert('Request done!');
				//alert(JSON.stringify(responseData))
				
				 $("#resultTable").find("tr:gt(0)").remove();
				// openPopup(responseData);
				drawTable(responseData, "#resultTable");
				responseData=[];
				

			});

		});
		$("#donorsubmit").click(function(e) {
			jQuery("#donorTable").show();
			jQuery("#donorId").show();
			
			
			var myarray = JSON.stringify(donorArray);
			$.post("/pallava_poc/getCountry", {
				myarray : myarray
			}, function(e) {

			}, "json").done(function(responseData) {
			//	alert('Request done!');
				drawTable(responseData, "#donorTable");
				donorArray = [];
				
			});

		});
		$("#patientsubmit").click(function(e) {
			jQuery("#patientTable").show();
			jQuery("#patientId").show(); 
			var myarray = JSON.stringify(patientArray);
			$.post("/pallava_poc/getCountry", {
				myarray : myarray
			}, function(e) {

			}, "json").done(function(responseData) {
				//alert('Request done!');
				drawTable(responseData, "#patientTable");
				
				patientArray=[];
			});

		});

		function drawTable(data, table) {
			for (var i = 0; i < data.length; i++) {
				if(table=="#resultTable"){
					drawrResult(data[i], table)
				}else{
				drawRow(data[i], table);
				}
			}
		}
		function drawRow(rowData, table) {
			var row = $("<tr />")
			$(table).append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
			row.append($("<td>" + rowData.name + "</td>"));
			row.append($("<td>" + rowData.address + "</td>"));
			row.append($("<td>" + rowData.mobile + "</td>"));
			row.append($("<td>" + rowData.bloodGroup + "</td>"));
			// jQuery("#donorTable").show();
			//jQuery("#donorId").show();
		}
		function drawrResult(rowData, table) {
			var row = $("<tr />")
			$(table).append(row); //this will append tr element to table... keep its reference for a while since we will add cels into it
			row.append($("<td>" + rowData.patientName + "</td>"));
			row.append($("<td>" + rowData.donorName + "</td>"));
			
			// jQuery("#donorTable").show();
			//jQuery("#donorId").show();
		}

/* 		function openPopup(responseData) {
			  var popup = window.open("", "", "width=640,height=480,resizeable,scrollbars"),
			      table = document.getElementById("resultTable");
			  drawTable(responseData, "#resultTable");
			  popup.document.write(table.outerHTML);
			  popup.document.close();
			  if (window.focus) 
			    popup.focus();
			} */
		function loadForm() {
			jQuery("#patientForm").show();
		}
		

	});