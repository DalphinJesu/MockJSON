/****************************** JS **************************************/
(function () {
	
	var newVATRcv = {"Id":0,"GenreCode":null,"Genre":null,"CostTypeId":null,"CostTypeName":null,"CountryId":null,"CountryName":null,"ProductId":null,"ProductName":null,"Rate":null,"PeriodBeginDate":"0001-01-01T00:00:00","PeriodEndDate":"0001-01-01T00:00:00"};
	
	var countries = [{"id":"","text":"","code":""},{"id":"AD","code":"AD","text":"Andorre"},{"id":"AT","code":"AT","text":"Autriche"},{"id":"BE","code":"BE","text":"Belgique"},{"id":"CZ","code":"CZ","text":"République Tchèque"},{"id":"DE","code":"DE","text":"Allemagne"},{"id":"DK","code":"DK","text":"Danemark"},{"id":"ES","code":"ES","text":"Espagne"},{"id":"FR","code":"FR","text":"France"},{"id":"GB","code":"GB","text":"Royaume-Uni"},{"id":"GI","code":"GI","text":"Gibraltar"},{"id":"HU","code":"HU","text":"Hongrie"},{"id":"IT","code":"IT","text":"Italie"},{"id":"LU","code":"LU","text":"Luxembourg"},{"id":"MA","code":"MA","text":"Maroc"},{"id":"NL","code":"NL","text":"Pays-Bas"},{"id":"PL","code":"PL","text":"Pologne"},{"id":"PT","code":"PT","text":"Portugal"},{"id":"SK","code":"SK","text":"Slovaquie"}];
	
	var costTypes = [{"id":"","text":"","code":""},{"id":6,"code":"Fuel","text":"Carburant"},{"id":2,"code":"Insurance","text":"Assurance"},{"id":10,"code":"Maintenance","text":"Maintenance"},{"id":9,"code":"Other","text":"Autres coûts"},{"id":4,"code":"Parking","text":"Parking"},{"id":8,"code":"Rent","text":"Loyers"},{"id":11,"code":"Sinistre","text":"Sinistre"},{"id":1,"code":"Tax","text":"Taxes"},{"id":7,"code":"Tires","text":"Entretien"},{"id":5,"code":"Toll","text":"Péage"},{"id":3,"code":"Washing","text":"Lavage"}];
	
	var genres = [{"id":"","text":"","code":""},{"id":"CAM","code":"CAM","text":"Camion"},{"id":"CL","code":"CL","text":"Cyclomoteurs à trois roues"},{"id":"CTTE","code":"CTTE","text":"Camionnette"},{"id":"MTL","code":"MTL","text":"Motocyclette légére"},{"id":"MTT1","code":"MTT1","text":"Motocyclette"},{"id":"MTT2","code":"MTT2","text":"Autre motocyclette"},{"id":"QM","code":"QM","text":"Quadricycle à moteur"},{"id":"REM","code":"REM","text":"Remorque"},{"id":"RESP","code":"RESP","text":"Caravane"},{"id":"SREM","code":"SREM","text":"Semi-remorque"},{"id":"TRA","code":"TRA","text":"Tracteur agricole"},{"id":"TRR","code":"TRR","text":"Tracteur routier"},{"id":"VASP","code":"VASP","text":"Véhicule automoteur spécialisé"},{"id":"VP","code":"VP","text":"Véhicule particulier"}];
	
	var koContainer = document.getElementById("koSystemTableVATRecoveries");
	$(koContainer).css("visibility", "visible");
	$('#selectCountries').select2({data: countries });
	$('#selectCostTypes').select2({data: countries });
	$('#selectGenres').select2({data: countries });

	$('.recovery-select-lists').on('select2:select', function(e){
		var selectedValue = selectedRecoveryValues();
		if(selectedValue.selectedCountry != '' && selectedValue.selectedCostType != '' && selectedValue.selectedGenre != '' ) {
			$('#synchronize_btn').show();
			reloadList(selectedValue);
		}
		else {
			$('#synchronize_btn').hide();
			
		}
	})
	
	var selectedRecoveryValues = function(){
		return {
			selectedCountry: $('#selectCountries').val() || '',
			selectedCostType: $('#selectCostTypes').val() || '',
			selectedGenre: $('#selectGenres').val() || '',
		};
	};
	
	var recoveryList = [];
	var reloadList = function(selectedValue){
		try {
			//self.error(null);
            //w.ShowPopinProcess();
			$.get("https://raw.githubusercontent.com/DalphinJesu/MockJSON/master/recoveryList.json")
			.fail(function (jqXHR, textStatus, err) {
				console.error(err)
				//self.error(err);
				//w.HidePopinProcess();
			})
			.done(function (data) {
				/*if (self.noActionPerformed()) {
					self.noActionPerformed(false);
				}*/
				$('#recovery_list_table').hide();
				if(data) {
					recoveryList = JSON.parse(data) || [];
					if(recoveryList.length != 0) {
						$('#recovery_list_table').show();
						console.info(recoveryList, " recoveryList ??? ");
						renderRecovery(recoveryList);
					}
				}
			});
			/*$.get(w.rootUrl + "SystemTables/FindVATRecoveries?countryId="+ selectedValue.selectedCountry + "&costTypeId=" + selectedValue.selectedCostType + "&genre=" + selectedValue.selectedGenre)
			 .fail(function (jqXHR, textStatus, err) {
				 self.error(err);
				 w.HidePopinProcess();
			 })
			 .done(function (data) {
				 if (self.noActionPerformed()) {
					 self.noActionPerformed(false);
				 }

				 ko.mapping.fromJS(data, self.itemMap, self.recoveryList);
				 w.HidePopinProcess();
			 });*/
		}
		catch (e) {
			w.HidePopinProcess();
			self.error(e.message);
		}
	};
	
	var renderRecovery = function(list){
		var content = '';
		for(var $data in list) {
			if(list.hasOwnProperty($data)) {
			content += '<tr class="loading-recovery-list"><td colspan="7"><img src="" alt="please wait..."></td></tr>' +
				'<tr class="recovery-list-rows">'+
					'<td>'+
						'<span class="edited-data">'+list[$data].CountryName+'</span>'+
						'<span class="editable-data">'+
							'<select class="recovery-list-countries" name="country"' +list[$data].Id+'></select>'+
						'</span>'+
					'</td>'+
					'<td>'+
						'<span class="edited-data">'+list[$data].CostTypeName+'</span>'+
						'<span class="editable-data">'+
							'<select class="recovery-list-costTypes" name="costType"'+list[$data].Id+'></select>'+
						'</span>'+
					'</td>'+
					'<td>'+
						'<span class="edited-data">'+list[$data].Genre+'</span>'+
						'<span class="editable-data">'+
							'<select class="recovery-list-genres" name="genre"'+ list[$data].Id+'></select>'+
						'</span>'+
					'</td>'+
					'<td>'+list[$data].ProductName+'</td>'+
					'<td>'+
						'<input class="recovery-input-field datefield" value="'+list[$data].PeriodBeginDate+'" type="text" style="width: 80px" disabled>'+
					'</td>'+
					'<td>'+
						'<input class="recovery-input-field datefield" value="'+list[$data].PeriodEndDate+'" type="text" style="width: 80px" disabled>'+
					'</td>'+
					'<td>'+
						'<input class="recovery-input-field" type="text" value="'+list[$data].Rate+'" id="rate"'+ list[$data].Id+'" disabled>'+
					'</td>'+
					'<td style="text-align: left">'+
						'<div class="table_actions">'+
							'<a class="table_modifier recovery_edit_btn" style="cursor: pointer;">'+
								'Edit<i class="icon modifier"></i>'+
							'</a>'+
							'<a class="table_modifier recovery_duplicate_btn" style="cursor: pointer;" onclick="duplicateRow()">Duplicate</a>'+
							'<a class="table_modifier recovery_delete_btn" style="cursor: pointer;" onclick="deleteDuplicatedRow">Delete</a>'+
							'<a class="table_modifier recovery_save_btn" style="cursor: pointer;" onclick="save()">'+
								'Save<i class="icon add-coll"></i>'+
							'</a>'+
							'<a class="table_modifier recovery_cancel_btn" style="cursor: pointer;" onclick="cancelEdit()">'+
								'Cancel<i class="icon del-coll"></i>'+
							'</a>'+
							'<!-- <i title="list[$data].errorMessage" class="picto-warning"></i> -->'
						'</div>'+
					'</td>'+
				'</tr>';
			}
		}
		var tbody = $('#recovery_list_table tbody');
		$(tbody).empty().html(content);
		initActions();
	};
	
	function initActions(){
		$('.datefield').datepicker();
		$('.loading-recovery-list, .editable-data, .recovery_delete_btn, .recovery_save_btn, .recovery_cancel_btn').hide();
		$('.editable-data select.recovery-list-countries').select2({data:countries});
		$('.editable-data select.recovery-list-costTypes').select2({data:costTypes});
		$('.editable-data select.recovery-list-genres').select2({data:genres});
		$('#recovery_list_table').on('click', '.recovery_edit_btn', editRecovery);
		$('#recovery_list_table').on('click', '.recovery_edit_btn', cancelEdit);
	}
	
	function editRecovery(){
		console.log($(this).closest('tr'), " ?? ")
		var closestRow = $(this).closest('tr');
		$(closestRow).find('.recovery-input-field').prop('disabled', true);
		$(closestRow).find('.table_actions a').hide();
		$(closestRow).find('.edited-data').hide();
		//$(closestRow).find('.editable-data, .recovery_save_btn, .recovery_cancel_btn').show();
	}
	
	function cancelEdit(){
		var closestRow = $(this).closest('tr');
		$(closestRow).find('.recovery-input-field').prop('disabled', false);
		$(closestRow).find('.table_actions a, .editable-data').hide();
		$(closestRow).find('.edited-data, .recovery_edit_btn, .recovery_duplicate_btn').show();
	}
	
})();
/****************************** JS **************************************/