!function(t){void 0===Craft.Events&&(Craft.Events={});var e="verbb\\events\\elements\\Event";Craft.Events.EventIndex=Craft.BaseElementIndex.extend({editableEventTypes:null,$newEventBtnEventType:null,$newEventBtn:null,init:function(e,n,i){this.on("selectSource",t.proxy(this,"updateButton")),this.on("selectSite",t.proxy(this,"updateButton")),this.base(e,n,i)},afterInit:function(){this.editableEventTypes=[],Craft.Events.editableEventTypes||(Craft.Events.editableEventTypes=[]);for(var t=0;t<Craft.Events.editableEventTypes.length;t++){var e=Craft.Events.editableEventTypes[t];this.getSourceByKey("eventType:"+e.id)&&this.editableEventTypes.push(e)}this.base()},getDefaultSourceKey:function(){if("index"===this.settings.context&&"undefined"!=typeof defaultEventTypeHandle)for(var e=0;e<this.$sources.length;e++){var n=t(this.$sources[e]);if(n.data("handle")===defaultEventTypeHandle)return n.data("key")}return this.base()},updateButton:function(){if(this.$source){var e=this.$source.data("handle"),n,i,s;if(this.editableEventTypes.length){var a,r;if(this.$newEventBtnEventType&&this.$newEventBtnEventType.remove(),e)for(n=0;n<this.editableEventTypes.length;n++)if(this.editableEventTypes[n].handle===e){a=this.editableEventTypes[n];break}if(this.$newEventBtnEventType=t('<div class="btngroup submit"/>'),a?(i=this._getEventTypeTriggerHref(a),s="index"===this.settings.context?Craft.t("events","New event"):Craft.t("events","New {eventType} event",{eventType:a.name}),this.$newEventBtn=t('<a class="btn submit add icon" '+i+">"+Craft.escapeHtml(s)+"</a>").appendTo(this.$newEventBtnEventType),"index"!==this.settings.context&&this.addListener(this.$newEventBtn,"click",function(t){this._openCreateEventModal(t.currentTarget.getAttribute("data-id"))}),this.editableEventTypes.length>1&&(r=t('<div class="btn submit menubtn"></div>').appendTo(this.$newEventBtnEventType))):this.$newEventBtn=r=t('<div class="btn submit add icon menubtn">'+Craft.t("events","New event")+"</div>").appendTo(this.$newEventBtnEventType),r){for(var d='<div class="menu"><ul>',n=0;n<this.editableEventTypes.length;n++){var l=this.editableEventTypes[n];"index"!==this.settings.context&&l===a||(i=this._getEventTypeTriggerHref(l),s="index"===this.settings.context?l.name:Craft.t("events","New {eventType} event",{eventType:l.name}),d+="<li><a "+i+'">'+Craft.escapeHtml(s)+"</a></li>")}t(d+="</ul></div>").appendTo(this.$newEventBtnEventType);var h=new Garnish.MenuBtn(r);"index"!==this.settings.context&&h.on("optionSelect",t.proxy(function(t){this._openCreateEventModal(t.option.getAttribute("data-id"))},this))}this.addButton(this.$newEventBtnEventType)}if("index"===this.settings.context&&"undefined"!=typeof history){var o="events/events";e&&(o+="/"+e),history.replaceState({},"",Craft.getUrl(o))}}},_getEventTypeTriggerHref:function(t){if("index"===this.settings.context){var e="events/events/"+t.handle+"/new";if(this.siteId&&this.siteId!=Craft.primarySiteId)for(var n=0;n<Craft.sites.length;n++)Craft.sites[n].id==this.siteId&&(e+="/"+Craft.sites[n].handle);return'href="'+Craft.getUrl(e)+'"'}return'data-id="'+t.id+'"'},_openCreateEventModal:function(n){if(!this.$newEventBtn.hasClass("loading")){for(var i,s=0;s<this.editableEventTypes.length;s++)if(this.editableEventTypes[s].id===n){i=this.editableEventTypes[s];break}if(i){this.$newEventBtn.addClass("inactive");var a=this.$newEventBtn.text();this.$newEventBtn.text(Craft.t("events","New {eventType} event",{eventType:i.name})),new Craft.ElementEditor({hudTrigger:this.$newEventBtnGroup,elementType:e,siteId:this.siteId,attributes:{typeId:n},onBeginLoading:t.proxy(function(){this.$newEventBtn.addClass("loading")},this),onEndLoading:t.proxy(function(){this.$newEventBtn.removeClass("loading")},this),onHideHud:t.proxy(function(){this.$newEventBtn.removeClass("inactive").text(a)},this),onSaveElement:t.proxy(function(t){var e="eventType:"+n;this.sourceKey!==e&&this.selectSourceByKey(e),this.selectElementAfterUpdate(t.id),this.updateElements()},this)})}}}}),Craft.registerElementIndexClass(e,Craft.Events.EventIndex)}(jQuery),function(t){void 0===Craft.Events&&(Craft.Events={}),Craft.Events.EventEdit=Garnish.Base.extend({$container:null,currentStartTime:null,currentEndTime:null,$startDate:null,$startTime:null,$endDate:null,$endTime:null,$allDay:null,init:function(e){this.$container=t("#"+e),this.$startDate=this.$container.find('[name="startDate[date]"]'),this.$startTime=this.$container.find('[name="startDate[time]"]'),this.$endDate=this.$container.find('[name="endDate[date]"]'),this.$endTime=this.$container.find('[name="endDate[time]"]'),this.$allDay=this.$container.find("#allDay-field .lightswitch"),this.$allDay.hasClass("on")&&this.checkAllDay(),this.addListener(this.$allDay,"change","checkAllDay"),this.addListener(this.$startDate,"change","updateEndDate"),this.addListener(this.$endDate,"change","updateStartDate")},checkAllDay:function(){this.$allDay.hasClass("on")?this.hideTime():this.showTime()},hideTime:function(){this.$startTime.addClass("disabled"),this.$startTime.prop("disabled",!0),this.currentStartTime=this.$startTime.val(),this.$startTime.val("12:00 AM"),this.$endTime.addClass("disabled"),this.$endTime.prop("disabled",!0),this.currentEndTime=this.$endTime.val(),this.$endTime.val("12:00 AM")},showTime:function(){this.$startTime.removeClass("disabled"),this.$startTime.prop("disabled",!1),this.$startTime.val(this.currentStartTime),this.$endTime.removeClass("disabled"),this.$endTime.prop("disabled",!1),this.$endTime.val(this.currentEndTime)},updateEndDate:function(){var t=this.$startDate.val(),e=this.$endDate.val();(Date.parse(t)>Date.parse(e)||""===e)&&this.$endDate.val(this.$startDate.val())},updateStartDate:function(){var t=this.$startDate.val(),e=this.$endDate.val();(Date.parse(e)<Date.parse(t)||""===t)&&this.$startDate.val(this.$endDate.val())}})}(jQuery),function(t){void 0===Craft.Events&&(Craft.Events={});var e="verbb\\events\\elements\\Ticket";Craft.Events.TicketIndex=Craft.BaseElementIndex.extend({afterInit:function(){var e='href="'+Craft.getUrl("events/tickets/new")+'"',n=Craft.t("events","New ticket");this.$newEventBtnGroup=t('<div class="btngroup submit"/>'),this.$newEventBtn=t('<a class="btn submit add icon" '+e+">"+n+"</a>").appendTo(this.$newEventBtnGroup),this.addButton(this.$newEventBtnGroup),this.base()}});try{Craft.registerElementIndexClass(e,Craft.Events.TicketIndex)}catch(t){}}(jQuery),function(t){void 0===Craft.Events&&(Craft.Events={}),Craft.Events.TicketEdit=Garnish.Base.extend({rowHtml:0,totalNewRows:0,$container:null,$ticketContainer:null,$ticketRows:null,$addBtn:null,$capacity:null,$quantity:null,currentStartTime:null,currentEndTime:null,$startDate:null,$startTime:null,$endDate:null,$endTime:null,$allDay:null,init:function(e,n){this.rowHtml=n,this.$container=t("#"+e),this.$ticketContainer=this.$container.find(".create-tickets-container"),this.$ticketRows=this.$ticketContainer.find(".create-tickets"),this.$addBtn=this.$container.find(".add-ticket"),this.$capacity=this.$container.find("#capacity"),this.$quantity=this.$container.find(".ticket-quantity");for(var i=0;i<this.$ticketRows.length;i++)new Craft.Events.TicketEditRow(this,this.$ticketRows[i],i);this.addListener(this.$addBtn,"click","addTicket"),this.addListener(this.$quantity,"change","sumAllQuantities")},addTicket:function(){this.totalNewRows++;var e="new"+this.totalNewRows,n=this.getParsedBlockHtml(this.rowHtml.bodyHtml,e),i=this.getParsedBlockHtml(this.rowHtml.footHtml,e),s=t(n).appendTo(this.$ticketContainer);Garnish.$bod.append(i),Craft.initUiElements(s),new Craft.Events.TicketEditRow(this,s,e)},getParsedBlockHtml:function(t,e){return"string"==typeof t?t.replace(/__ROWID__/g,e):""},sumAllQuantities:function(){var e=0;t.each(t("body").find(".ticket-quantity"),function(){e+=Number(t(this).val())}),this.$capacity.val(e)}}),Craft.Events.TicketEditRow=Garnish.Base.extend({id:null,editContainer:null,$container:null,$settingsContainer:null,$settingsBtn:null,$deleteBtn:null,$capacity:null,$quantity:null,init:function(e,n,i){this.id=i,this.editContainer=e,this.$container=t(n),this.$settingsContainer=this.$container.find(".create-tickets-settings"),this.$settingsBtn=this.$container.find(".settings.icon"),this.$deleteBtn=this.$container.find(".delete.icon.button"),this.$capacity=t("body").find("#capacity"),this.$quantity=this.$container.find(".ticket-quantity"),this.addListener(this.$settingsBtn,"click","settingsRow"),this.addListener(this.$deleteBtn,"click","deleteRow"),this.addListener(this.$quantity,"change","sumAllQuantities")},settingsRow:function(){this.$settingsContainer.is(":visible")?(this.$settingsBtn.removeClass("active"),this.$settingsContainer.velocity("slideUp")):(this.$settingsBtn.addClass("active"),this.$settingsContainer.velocity("slideDown"))},deleteRow:function(){this.$container.remove(),this.sumAllQuantities()},sumAllQuantities:function(){var e=0;t.each(t("body").find(".ticket-quantity"),function(){e+=Number(t(this).val())}),this.$capacity.val(e)}})}(jQuery),void 0===Craft.Events&&(Craft.Events={}),jQuery;
//# sourceMappingURL=events.js.map