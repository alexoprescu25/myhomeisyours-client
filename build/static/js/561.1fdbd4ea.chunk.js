"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[561],{6561:(e,a,n)=>{n.r(a),n.d(a,{default:()=>v});var i=n(5043);const l={branding__actions:"Branding_branding__actions__zQd3H",branding__name:"Branding_branding__name__ez29D",section__buttons:"Branding_section__buttons__Xsds5",branding__delete:"Branding_branding__delete__YaF9Z","heading-primary":"Branding_heading-primary__sgLYs",branding__image:"Branding_branding__image__cJF3t",branding__container:"Branding_branding__container__9CFlI",branding__header:"Branding_branding__header__-SYMM",branding__submit:"Branding_branding__submit__x53Ti",branding__assets:"Branding_branding__assets__v7+HA",branding__input:"Branding_branding__input__jbHEI",branding__title:"Branding_branding__title__Vk5Jv",branding__videos:"Branding_branding__videos__Yy0gH",branding__video:"Branding_branding__video__i9KA9",section__container:"Branding_section__container__0P0TK",branding__icon:"Branding_branding__icon__i4ApE"};var r=n(4858),s=n(9542),t=n(2068),o=n(7198),d=n(3910),c=n(7929),m=n(8192),u=n(8139),g=n.n(u),b=n(579);const v=e=>{let{property:a,onUpdateBranding:n,onSkip:u}=e;const[v,_]=(0,i.useState)(!1),[h,p]=(0,i.useState)(null),[y,x]=(0,i.useState)(null),[f,A]=(0,i.useState)(null),{control:j,handleSubmit:k,formState:{errors:w}}=(0,r.mN)(),{fields:C,append:N,remove:B}=(0,r.jz)({name:"videos",control:j}),S=()=>{N({name:"",url:"",type:"vimeo"})},F=async()=>{if(!h)return;const e=new FormData;let n;for(const a of h)e.append("images",a);const i=await(0,t.V6)(e);return i&&200===i.status&&(n=await(0,t.AK)(a._id.toString(),i.data.images)),n},I=async()=>{if(!y)return;let e;const n=new FormData;n.append("image",y);const i=await(0,t.LT)(n);return i&&200===i.status&&(e=await(0,t.vH)(a._id.toString(),{key:i.data.key,name:i.data.name,url:i.data.url})),e};return(0,b.jsxs)(s.uA,{className:l.branding,children:[(0,b.jsxs)("div",{className:l.branding__header,children:[(0,b.jsx)(s.hE,{children:"Enhance Your Listing with Beautiful Images"}),(0,b.jsx)("p",{children:"Ready to make your listing stand out? Start adding images now and see the difference they make!"})]}),(0,b.jsx)("div",{className:l.branding__container,children:(0,b.jsxs)("div",{className:l.branding__assets,children:[h&&(0,m.AH)(h).map(((e,a)=>(0,b.jsxs)("div",{className:l.branding__image,children:[(0,b.jsx)("img",{src:URL.createObjectURL(e),alt:"Image"}),(0,b.jsxs)("div",{className:l.branding__actions,children:[(0,b.jsxs)("p",{children:[" ",e.name," "]}),(0,b.jsx)("button",{className:l.branding__delete,onClick:()=>(e=>{const a=Array.from(h),n=a.findIndex((a=>a.name===e.name));-1!==n&&a.splice(n,1),p(a)})(e),children:(0,b.jsx)(d.g,{icon:c.yLS})})]})]},a))),(0,b.jsx)("div",{className:l.branding__input,children:(0,b.jsx)(s.SE,{onSave:e=>{if(e)if(h){const a=Array.from(h).concat(Array.from(e));p(a)}else p(Array.from(e))},children:(0,b.jsx)(i.Fragment,{children:(0,b.jsx)("img",{src:"/images/icons/copyright.png",alt:"Image"})})})})]})}),(0,b.jsxs)("div",{className:l.branding__header,children:[(0,b.jsx)(s.hE,{children:"Floorplan"}),(0,b.jsx)("p",{children:"Please add a floor plan to your listing to give potential buyers a complete view of the property's layout. "})]}),(0,b.jsx)("div",{className:l.branding__container,children:(0,b.jsxs)("div",{className:l.branding__assets,children:[f&&(0,b.jsx)("div",{className:l.branding__image,children:(0,b.jsx)("img",{src:f,alt:"Image"})}),(0,b.jsx)("div",{className:l.branding__input,children:(0,b.jsx)(s.zp,{id:"floorplan",onSave:(e,a)=>{e&&x(e),a&&A(a)},children:(0,b.jsxs)(i.Fragment,{children:[(0,b.jsx)("img",{src:"/images/icons/blueprint.png",alt:"Image"}),y&&(0,b.jsxs)("p",{className:l.branding__name,children:[" ",y.name," "]})]})})})]})}),(0,b.jsxs)("div",{className:l.branding__title,children:[(0,b.jsx)(s.hE,{image:"vimeo",children:"Video"}),(0,b.jsx)("div",{className:l.section__buttons,children:(0,b.jsx)("button",{type:"button",onClick:S,children:"+"})}),(0,b.jsx)("p",{children:'( Click "+" to add your first video )'})]}),(0,b.jsx)("div",{className:g()(l.branding__step,l.branding__videos),children:C.map(((e,a)=>(0,b.jsx)("div",{className:l.branding__video,children:(0,b.jsxs)("section",{className:l.section,children:[(0,b.jsx)("p",{className:l.section__heading,children:(0,b.jsxs)("strong",{children:["Video ",Number(a+1)]})}),(0,b.jsxs)("div",{className:l.section__container,children:[(0,b.jsx)(r.xI,{control:j,rules:{required:"Name is required"},name:"videos.".concat(a,".name"),render:e=>{let{field:a}=e;return(0,b.jsx)(s.pd,{required:!0,label:"Name",errors:w,...a})}}),(0,b.jsx)(r.xI,{control:j,rules:{required:"Url is required"},name:"videos.".concat(a,".url"),render:e=>{let{field:a}=e;return(0,b.jsx)(s.pd,{required:!0,label:"Url",errors:w,...a})}}),(0,b.jsx)(r.xI,{name:"videos.".concat(a,".type"),control:j,rules:{required:"Video source is required"},render:e=>{let{field:a}=e;return(0,b.jsx)(s.l6,{...a,optionsArray:o.$.videoConfigArray,errors:w,defaultValue:"Source",required:!0})}}),(0,b.jsxs)("div",{className:l.section__buttons,children:[(0,b.jsx)("button",{type:"button",onClick:S,children:"+"}),(0,b.jsx)("button",{type:"button",onClick:()=>(e=>{B(e)})(a),children:"-"})]})]})]},e.id)},e.id)))}),(0,b.jsx)("div",{className:l.branding__submit,children:(0,b.jsx)(s.$n,{mode:"main",onClick:k((async e=>{_(!0);try{e&&e.videos&&e.videos.length>0&&await(0,t.UT)(e.videos,a._id.toString());const i=await F();await I(),i?n(i):u()}catch(i){console.error(i)}finally{_(!1)}})),isLoading:v,children:"Finish Up"})})]})}},7198:(e,a,n)=>{n.d(a,{$:()=>r,u:()=>s});const i=(e,a)=>a.map((a=>{let{name:n,label:i}=a;return((e,a,n)=>({name:a,value:"summary.".concat(e,".").concat(a,".isAvailable"),label:n,rules:{},icon:{type:"image",path:"".concat(l,"/").concat(a,".png")}}))(e,n,i)})),l="/images/icons",r={summary:{general:i("general",[{name:"workspace",label:"Workspace"},{name:"parking",label:"Parking"},{name:"petFriendly",label:"Pet Friendly"},{name:"tv",label:"TV"},{name:"wifi",label:"Wi-Fi"},{name:"ventilation",label:"Ventilation"},{name:"elevator",label:"Lift"}]),kitchen:i("kitchen",[{name:"microwave",label:"Microwave"},{name:"oven",label:"Oven"},{name:"hob",label:"Hob"},{name:"fridge",label:"Fridge"},{name:"freezer",label:"Freezer"},{name:"kettle",label:"Kettle"},{name:"toaster",label:"Toaster"},{name:"dishwasher",label:"Dishwasher"}]),laundry:i("laundry",[{name:"washingMachine",label:"Washing Machine"},{name:"clothesHorse",label:"Clothes Horse"},{name:"iron",label:"Iron"},{name:"tumbleDryer",label:"Tumble Dryer"}]),outside:i("outside",[{name:"garden",label:"Garden"},{name:"balcony",label:"Balcony"},{name:"patio",label:"Patio"},{name:"bbq",label:"Barbecue"}]),safety:i("safety",[{name:"carbonMonoxideAlarm",label:"Carbon Monoxide Alarm"},{name:"smokeAlarm",label:"Smoke Alarm"},{name:"gasCertificate",label:"Gas Certificate"},{name:"eicrRates",label:"EICR Rates"}])},propertyTypeArray:[{name:"House",value:"house"},{name:"Bungalow",value:"bungalow"},{name:"Maisonette",value:"maisonette"},{name:"Apartment",value:"apartment"}],parkingArray:[{name:"On-Site Free",value:"on-site-free"},{name:"On-Site Chargeable",value:"on-site-chargeable"},{name:"Off-Site Free",value:"off-site-free"},{name:"Off-Site Chargeable",value:"off-site-chargeable"}],checkInOptions:[{name:"Meet & Greet",value:"meet-and-greet"},{name:"Key Box",value:"key-box"}],petsPolicyOptions:[{name:"Yes - Free Of Charge",value:"free"},{name:"Yes - Chargeable",value:"chargeable"},{name:"No",value:"no"}],bedConfigurationArray:[{name:"Single",value:"single"},{name:"Double",value:"double"},{name:"King",value:"king"},{name:"Sofa Bed",value:"sofa"},{name:"Cots",value:"cots"},{name:"Twins Single",value:"twins"}],bathroomConfigurationArray:[{name:"WC",value:"wc"},{name:"Walk In Shower",value:"walk-in-shower"},{name:"Wet Room",value:"wet-room"},{name:"Bath",value:"bath"},{name:"Bath + Shower In Bath",value:"bath-plus-shower"}],bathroomValueConfig:[{name:"0.5",value:"0.5"},{name:"1",value:"1"}],houseKeepingArray:[{name:"Daily - Included",value:"daily-included"},{name:"Daily - Extra Charge",value:"daily-extra-charge"},{name:"Weekly - Included",value:"weekly-included"},{name:"Weekly - Extra Charge",value:"weekly-extra-charge"},{name:"Fortnightly - Included",value:"fortnightly-included"},{name:"Fortnightly - Extra Charge",value:"fortnightly-extra-charge"},{name:"Upon Request - Included",value:"upon-request-included"},{name:"Upon Request - Extra Charge",value:"upon-request-extra-charge"}],statusConfigArray:[{name:"Live",value:"live"},{name:"Rejected",value:"rejected"},{name:"Booked",value:"booked"}],videoConfigArray:[{name:"Vimeo",value:"vimeo"},{name:"YouTube",value:"youtube"}]},s={type:"",floor:"",livePropertyLink:"",address:{number:"",street:"",city:"",zip:""},summary:{general:{parking:{isAvailable:!0,value:"parking"},petFriendly:{isAvailable:!0,value:"petFriendly"},tv:{isAvailable:!0,value:"tv"},wifi:{isAvailable:!0,value:"wifi"},ventilation:{isAvailable:!1,value:"ventilation"},workspace:{isAvailable:!0,value:"workspace"},elevator:{isAvailable:!1,value:"elevator"}},kitchen:{microwave:{isAvailable:!0,value:"microwave"},oven:{isAvailable:!0,value:"oven"},hob:{isAvailable:!0,value:"hob"},fridge:{isAvailable:!0,value:"fridge"},freezer:{isAvailable:!0,value:"freezer"},kettle:{isAvailable:!0,value:"kettle"},toaster:{isAvailable:!0,value:"toaster"},dishwasher:{isAvailable:!0,value:"dishwasher"}},laundry:{washingMachine:{isAvailable:!0,value:"washingMachine"},clothesHorse:{isAvailable:!0,value:"clothesHorse"},iron:{isAvailable:!0,value:"iron"},tumbleDryer:{isAvailable:!1,value:"tumbleDryer"}},outside:{garden:{isAvailable:!0,value:"garden"},balcony:{isAvailable:!0,value:"balcony"},patio:{isAvailable:!0,value:"patio"},bbq:{isAvailable:!0,value:"bbq"}},safety:{carbonMonoxideAlarm:{isAvailable:!0,value:"carbonMonoxideAlarm"},smokeAlarm:{isAvailable:!0,value:"smokeAlarm"},gasCertificate:{isAvailable:!0,value:"gasCertificate"},eicrRates:{isAvailable:!0,value:"eicrRates"}}},parkingType:{value:"off-site-chargeable"},checkInProcess:{value:"key-box"},petsPolicy:{value:"chargeable"},housekeeping:{value:"upon-request-extra-charge"},cancellation:"Non refundable",checkIn:"16:00",checkOut:"10:00",bedrooms:[{type:"bedroom",name:"Bedroom",beds:[{type:"single"}]}],livingRooms:[{type:"living-room",name:"Living Room",beds:[{type:"single"}]}],bathrooms:[{type:"wc",value:.5}],videos:[],sellingPoints:[{text:"All bills included. No extra charges"},{text:"Guests have exclusive usage of the property"}],landlord:{name:"",email:"",phone:"",nightlyRate:"",deposit:"",cleaningFee:"",parking:"",petFee:"",other:"",margin:"10"},external:{nightlyRate:"",deposit:"",cleaningFee:"",parking:"",petFee:"",other:""}}}}]);
//# sourceMappingURL=561.1fdbd4ea.chunk.js.map