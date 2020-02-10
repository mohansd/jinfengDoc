var symbols = " !\"#$%&'()*+,-./0123456789:;<=>?@";
var loAZ = "abcdefghijklmnopqrstuvwxyz";
symbols+= loAZ.toUpperCase();
symbols+= "[\\]^_`";
symbols+= loAZ;
symbols+= "{|}~";

function PrevCmd(){
  s="";
  return s;
}

function GetCmd(s){
  if (s=="CMD_GETPARAM"){
    s1="E000";  //LORA--7000
  }
  if (s=="CMD_REPLYCONFIG"){
    s1="E000"; //LORA--F000
  }
  if (s=="CMD_RESET"){
    s1="E006"; 
  }
  if (s=="CMD_SETDEFAULT"){
    s1="E003"; 
  }
  if (s=="CMD_GETSTATUS"){
    s1="E004"; 
  }
  if (s=="CMD_SETSTATUS"){
    s1="E005"; 
  }
  if (s=="CMD_GETDTUVER"){
    s1="E001"; 
  }
  if (s=="CMD_ENTERWORKMODE"){
    s1="E022"; 
  }
  return s1;
}
function toAscii()
{
	valueStr = hexinput;
	valueStr = valueStr.toLowerCase();
        var hex = "0123456789abcdef";
	var text = "";
	var i=0;

	for( i=0; i<valueStr.length; i=i+2 )
	{
		var char1 = valueStr.charAt(i);
		if ( char1 == ':' )
		{
			i++;
			char1 = valueStr.charAt(i);
		}
		var char2 = valueStr.charAt(i+1);
		var num1 = hex.indexOf(char1);
		var num2 = hex.indexOf(char2);

                if ((num1+num2)==0) break;  //add by lq 0作为可见字符串的结束

		var value = num1 << 4;
		value = value | num2;

		var valueInt = parseInt(value);
		var symbolIndex = valueInt - 32;
		var ch = ' ';
		if ( symbolIndex >= 0 && value <= 126 )
		{
			ch = symbols.charAt(symbolIndex)
		}
		text += ch;
	}
	return text;
}

function toHex()
{
	var valueStr = ascinput;
	var hexChars = "0123456789abcdef";
	var text = "";
	for( i=0; i<valueStr.length; i++ )
	{
		var oneChar = valueStr.charAt(i);

                //if ((oneChar>=0) && (oneChar<=255)) 
                {

 		 var asciiValue = symbols.indexOf(oneChar) + 32;
		 var index1 = asciiValue % 16;
		 var index2 = (asciiValue - index1)/16;

		 text += hexChars.charAt(index2);
 	 	 text += hexChars.charAt(index1);
                }
/*
                else {
                  c1=(oneChar / 256); c2=(oneChar % 256);
 		  var asciiValue = symbols.indexOf(c1) + 32;
		  var index1 = asciiValue % 16;
		  var index2 = (asciiValue - index1)/16;
		  text += hexChars.charAt(index2);
 	 	  text += hexChars.charAt(index1);

 		  var asciiValue = symbols.indexOf(c2) + 32;
		  var index1 = asciiValue % 16;
		  var index2 = (asciiValue - index1)/16;
		  text += hexChars.charAt(index2);
 	 	  text += hexChars.charAt(index1);                  

                }
*/
	}
	return text;
}

function SetHex()
{
   return ascinput;
}

function GetHex()
{
   return hexinput;
}

function SetVLenHex()
{
   a=ascinput.length;
   if (a<32)  return '0'+Math.floor(ascinput.length /2).toString(16)+ascinput;
   else return Math.floor(ascinput.length /2).toString(16)+ascinput;
}

function GetVLenHex()
{
   return hexinput.substr(2,hexinput.length-2);
}

function SetVBeat()
{
   a=parseInt(ascinput);
   if(a==32768){
       ascinput= 32768+546;       
   }
   else if(a>32768){
       ascinput=32768+(a/60) ;
   }
   return SetWord();
}

function GetVBeat()
{
    a=parseInt('0x'+hexinput,16);
    if(a>=32768){
       b= (a-32768)*60;       
    }
    else b=a;
     return b.toString();
}

function GetStr()
{
 return toAscii(hexinput);
};

function SetStr()
{
 return toHex().toUpperCase();
};

function GetByte()
{
 a=parseInt('0x'+hexinput,16);
 return a.toString();
};

function SetByte()
{
 a=parseInt(ascinput,10);
 b=a.toString(16).toUpperCase();
 if (b.length==1) b='0'+b;
 return b;
};

function GetWord()
{
 a=parseInt('0x'+hexinput,16);
 return a.toString();
};

function SetWord()
{
 a=parseInt(ascinput,10);
 b=a.toString(16).toUpperCase();
 if (b.length<4) b='0'+b;
 if (b.length<4) b='0'+b;
 if (b.length<4) b='0'+b;
 return b;
};


/*
//浮点->4字节 HEX
function ieee754encode(data) {
       
//        var array=new Uint8Array((new Float32Array([data])).buffer)

        var array=new Uint8ClampedArray(4)
 　　var val="";
　　 for(var i = array.length-1;i>=0; i--){
 　　　  b=array[i].toString(16).toUpperCase();
              if (b.length<2) b='0'+b;
              val += b;
　　}
　　return val;
};

//4字节HEX->浮点
function ieee754decode (data){
       var f1=new Float32Array([0]);
       var array1=new Uint8Array(f1.buffer);
       array1[0]=parseInt(data.substr(6,2), 16);  
       array1[1]=parseInt(data.substr(4,2), 16);  
       array1[2]=parseInt(data.substr(2,2), 16);  
       array1[3]=parseInt(data.substr(0,2), 16);  
       return f1[0];
}    
*/
//浮点->4字节 HEX
function ieee754encode(data) {
        var array=new Uint8ClampedArray(4)
 　　var val="";
　　 for(var i = 0; i<=3; i++){
 　　　  b=array[3-i].toString(16).toUpperCase();
              if (b.length<2) b='0'+b;
              val += b;
　　}
　　return val;
};

//4字节HEX->浮点
function ieee754decode (data){
       var f1=new Float32Array([0]);
       var array1=new Uint8Array(f1.buffer);
       array1[3]=parseInt(data.substr(0,2), 16);  
       array1[2]=parseInt(data.substr(2,2), 16);  
       array1[1]=parseInt(data.substr(4,2), 16);  
       array1[0]=parseInt(data.substr(6,2), 16);  
       return f1[0];
}    


function GetFloat()
{
   data=hexinput;
   f=ieee754decode(data);
   return f.toString();
};

function SetFloat()
{
  data=ascinput*1.0;
  r=ieee754encode(data)
  return r;
};


function int(num){return num-num%1};

function GetBatV()
{
 a=parseInt('0x'+hexinput,16);
 return (a/100).toString();
};

function SetBatV()
{
 a=parseFloat(ascinput,10);
 a=a*100;
 b=int(a).toString(16).toUpperCase();
 if (b.length<4) b='0'+b;
 if (b.length<4) b='0'+b;
 if (b.length<4) b='0'+b;
 return b;
};

function GetDWord()
{
 a=parseInt('0x'+hexinput,16);
 return a.toString();
};

function SetDWord()
{
 a=parseInt(ascinput,10);
 b=a.toString(16).toUpperCase();
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 if (b.length<8) b='0'+b;
 return b;
};

function GetIP()
{
 var a=hexinput;
 c0=a.charAt(0); c1=a.charAt(1);
 c2=a.charAt(2); c3=a.charAt(3);
 c4=a.charAt(4); c5=a.charAt(5);
 c6=a.charAt(6); c7=a.charAt(7);
 ip1=parseInt('0x'+c0+c1,16);
 ip2=parseInt('0x'+c2+c3,16);
 ip3=parseInt('0x'+c4+c5,16);
 ip4=parseInt('0x'+c6+c7,16);

 b=ip1.toString()+'.'+ip2.toString()+'.'+ip3.toString()+'.'+ip4.toString();
 return b;
};

function SetIP()
{
 ip=ascinput;
 ip=ip.split(".");
 a=parseInt(ip[0]).toString(16).toUpperCase();
 b=parseInt(ip[1]).toString(16).toUpperCase();
 c=parseInt(ip[2]).toString(16).toUpperCase();
 d=parseInt(ip[3]).toString(16).toUpperCase();
 if (a.length==1) a='0'+a;
 if (b.length==1) b='0'+b;
 if (c.length==1) c='0'+c;
 if (d.length==1) d='0'+d;
 return a+b+c+d;
};


function GetMac()
{
 var a=hexinput;
 b=a.substr(0,2)+'-'+a.substr(2,2)+'-'+a.substr(4,2)+'-'+a.substr(6,2)+'-'+a.substr(8,2)+'-'+a.substr(10,2);
 return b;
};

function SetMac()
{
 mac=ascinput;
 mac=mac.split("-");
 a=parseInt(mac[0]).toString(16).toUpperCase();
 b=parseInt(mac[1]).toString(16).toUpperCase();
 c=parseInt(mac[2]).toString(16).toUpperCase();
 d=parseInt(mac[3]).toString(16).toUpperCase();
 e=parseInt(mac[4]).toString(16).toUpperCase();
 f=parseInt(mac[5]).toString(16).toUpperCase();

 if (a.length==1) a='0'+a;
 if (b.length==1) b='0'+b;
 if (c.length==1) c='0'+c;
 if (d.length==1) d='0'+d;
 if (e.length==1) e='0'+e;
 if (f.length==1) f='0'+f;

 return a+b+c+d+e+f;
};

function GetCSAddr()
{
 var a=hexinput;
 c0=a.charAt(0); c1=a.charAt(1);
 c2=a.charAt(2); c3=a.charAt(3);
 c4=a.charAt(4); c5=a.charAt(5);
 c6=a.charAt(6); c7=a.charAt(7);

 ip1=parseInt('0x'+c0+c1,16);
 ip2=parseInt('0x'+c2+c3,16);
 ip3=parseInt('0x'+c4+c5,16);
 ip4=parseInt('0x'+c6+c7,16);

 b=ip1.toString()+','+ip2.toString()+','+ip3.toString()+','+ip4.toString();
 return b;
};

function SetCSAddr()
{
 ip=ascinput;
 ip=ip.split(",");
 a=parseInt(ip[0]).toString(16).toUpperCase();
 b=parseInt(ip[1]).toString(16).toUpperCase();
 c=parseInt(ip[2]).toString(16).toUpperCase();
 d=parseInt(ip[3]).toString(16).toUpperCase();
 if (a.length==1) a='0'+a;
 if (b.length==1) b='0'+b;
 if (c.length==1) c='0'+c;
 if (d.length==1) d='0'+d;
 return a+b+c+d;
};

function SetRFWarnLevel()
{
 var a=ascinput;
 a=a.split(",");
 i1=a[0];  i2=a[1];  i3=a[2];   i4=a[3];   i5=a[4];
 i1=i1.split(":");
 i2=i2.split(":");
 i3=i3.split(":");
 i4=i4.split(":");
 i5=i5.split(":");
 s1=parseInt(i1[1]).toString(16).toUpperCase(); if (s1.length==1) s1='0'+s1;
 s2=parseInt(i2[1]).toString(16).toUpperCase(); if (s2.length==1) s2='0'+s2;
 s3=parseInt(i3[1]).toString(16).toUpperCase(); if (s3.length==1) s3='0'+s3;
 s4=parseInt(i4[1]).toString(16).toUpperCase(); if (s4.length==1) s4='0'+s4;
 s5=parseInt(i5[1]).toString(16).toUpperCase(); if (s5.length==1) s5='0'+s5;
 return s1+s2+s3+s4+s5;
};

function GetRFWarnLevel()
{
 var a=hexinput;
 i1=parseInt('0x'+a.charAt(0)+a.charAt(1),16);
 i2=parseInt('0x'+a.charAt(2)+a.charAt(3),16);
 i3=parseInt('0x'+a.charAt(4)+a.charAt(5),16);
 i4=parseInt('0x'+a.charAt(6)+a.charAt(7),16);
 i5=parseInt('0x'+a.charAt(8)+a.charAt(9),16);

 ret='1h:'+i1.toString()+','+'3h:'+i2.toString()+','+'6h:'+i3.toString()+','+'12h:'+i4.toString()+','+'24h:'+i5.toString();
 return ret;
};

function GetMDCAddr()
{
  if (hexinput=='00') ret= ' ';
  else if (hexinput.substring(0,2)=='02') {
      a='1'+hexinput.substring(2,5);        //注：这里加前缀是避免0在最前面被javascript认作8进制
      b='1'+hexinput.substring(5,8);
      c='1'+hexinput.substring(8,11);
      d='1'+hexinput.substring(11,14);
      e='1'+hexinput.substring(14,20);
      ret=(parseInt(a)-1000).toString()+'.'+(parseInt(b)-1000).toString()+'.'+(parseInt(c)-1000).toString()+'.'+(parseInt(d)-1000).toString()+':'+(parseInt(e)-1000000).toString();
  }
  else if (hexinput.substring(0,2)=='01') {
     hexinput=hexinput.substring(2,hexinput.length);
     ret=toAscii();
  }
  else if (hexinput.substring(0,2)=='03') {
     hexinput=hexinput.substring(2,hexinput.length);
     ret=toAscii();
  }

  return ret;
};

function SetMDCAddr()
{
  if (ascinput.length==0){
    return '00';
  }
  else if (ascinput.length>7){
   if (ascinput.indexOf(':')>=0){ //ip:port形式
    a=ascinput;
    a=a.split(':');
    b=a[0]; c=a[1];
    b=b.split('.');
    i1=b[0].toString(16); if (i1.length<3) i1='0'+i1; if (i1.length<3) i1='0'+i1;
    i2=b[1].toString(16); if (i2.length<3) i2='0'+i2; if (i2.length<3) i2='0'+i2;
    i3=b[2].toString(16); if (i3.length<3) i3='0'+i3; if (i3.length<3) i3='0'+i3;
    i4=b[3].toString(16); if (i4.length<3) i4='0'+i4; if (i4.length<3) i4='0'+i4;
    port=a[1].toString(16);
    if (port.length<6) port='0'+port;
    if (port.length<6) port='0'+port;
    if (port.length<6) port='0'+port;
    if (port.length<6) port='0'+port;
    if (port.length<6) port='0'+port;
    return '02'+i1+i2+i3+i4+port;
   }
   else{ //短信形式
     return '01'+toHex();
   }
  }
  else{//<=6 北斗
    return '03'+toHex();
  }
};

function GetTime(){
 return '{"TYPE":"ASCII","CMD":"GETCLOCK\\r\\n","DATA":""}';
}



function GetVersion(){
 return '{"TYPE":"ASCII","CMD":"VERSION\\r\\n","DATA":""}';
}

function GetGPRSState(){
 return '{"TYPE":"PACKET","CMD":"E004","DATA":""}';
}

function OnGPRSState(){
 a=hexinput.charAt(12)+hexinput.charAt(13);
 if (a=='00') return '0-休眠';
 if (a=='01') return '1-未注册';
 if (a=='02') return '2-登陆GSM网络';
 if (a=='03') return '3-拨号中';
 if (a=='04') return '4-拨号成功';
 if (a=='05') return '5-登陆成功';     
}

function GetReport(){
 return '{"TYPE":"PACKET","CMD":"E013","DATA":""}';
}

function OnReport(){
 return 'hello1';
}

function GetWMState(){
  return '{"TYPE":"ASCII","CMD":"GETWL\\r\\n","DATA":""}';
}

function GetBATVCC(){
  return '{"TYPE":"ASCII","CMD":"GETBATVCC\\r\\n","DATA":""}';
}

function GetTemperature(){
  return '{"TYPE":"ASCII","CMD":"GETTEMPERATURE\\r\\n","DATA":""}';
}

function GetCurrentTime(){
  today = new Date();
  Year=today.getYear();
  if(Year<1900) Year=Year+1900;

  Month=today.getMonth()+1;
  Day=today.getDate();

  Hour=today.getHours();
  Minute=today.getMinutes();
  Second=today.getSeconds();
  return Year.toString()+'-'+Month.toString()+'-'+Day.toString()+' '+Hour.toString()+':'+Minute.toString()+':'+Second.toString();
}

function SetClock(){
  return '{"TYPE":"ASCII","CMD":"SETCLOCK '+  GetCurrentTime() +  '\\r\\n","DATA":""}';
}

function GetRFSW()
{
  return '{"TYPE":"ASCII","CMD":"GETRFSW\\r\\n","DATA":""}';
}

function GetJPG()
{
  return '{"TYPE":"ASCII","CMD":"GETJPG\\r\\n","DATA":""}';
}

function GetGSMSignal()
{
  return '{"TYPE":"ASCII","CMD":"GSMSIGNAL\\r\\n","DATA":""}';
}


function GetBDStatus()
{
  return '{"TYPE":"ASCII","CMD":"BEIDOUSTATUS\\r\\n","DATA":""}';
}

function BDDataTest()
{
  return '{"TYPE":"ASCII","CMD":"BEIDOUDATATEST\\r\\n","DATA":""}';
}

function GetBDLocate()
{
  return '{"TYPE":"ASCII","CMD":"BEIDOULOCATE\\r\\n","DATA":""}';
}


function GetBDTime()
{
  return '{"TYPE":"ASCII","CMD":"BEIDOUTIME\\r\\n","DATA":""}';
}


function SendTestReport()
{
  return '{"TYPE":"ASCII","CMD":"SENDTESTREPORT\\r\\n","DATA":""}';
}


function SendArtifi()
{
  return '{"TYPE":"ASCII","CMD":"SENDARTIFI\\r\\n","DATA":""}';
}


