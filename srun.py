#coding:utf-8
import urllib
import urllib2

###########################################################################
## Python code generated with wxFormBuilder (version Jun 17 2015)
## http://www.wxformbuilder.org/
##
## PLEASE DO "NOT" EDIT THIS FILE!
###########################################################################
import wx
import wx.xrc

###########################################################################
## Class srun_gui
###########################################################################

class srun_gui ( wx.Frame ):
	
	def __init__( self, parent ):
		wx.Frame.__init__ ( self, parent, id = wx.ID_ANY, title = u"Bluyea's Srun", pos = wx.DefaultPosition, size = wx.Size( 319,369 ), style = wx.DEFAULT_FRAME_STYLE|wx.TAB_TRAVERSAL )
		
		self.SetSizeHintsSz( wx.DefaultSize, wx.DefaultSize )
		self.SetForegroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_INACTIVECAPTION ) )
		self.SetBackgroundColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_INACTIVECAPTION ) )
		
		bSizer3 = wx.BoxSizer( wx.VERTICAL )
		
		self.Account = wx.TextCtrl( self, wx.ID_ANY, u"账号", wx.DefaultPosition, wx.DefaultSize, wx.TE_CENTRE|wx.TE_READONLY )
		self.Account.SetMaxLength( 4 ) 
		bSizer3.Add( self.Account, 0, wx.ALL, 5 )
		
		self.account = wx.TextCtrl( self, wx.ID_ANY, wx.EmptyString, wx.DefaultPosition, wx.DefaultSize, 0 )
		bSizer3.Add( self.account, 0, wx.ALL, 5 )
		
		self.Password = wx.TextCtrl( self, wx.ID_ANY, u"密码", wx.DefaultPosition, wx.DefaultSize, wx.TE_CENTRE|wx.TE_READONLY )
		#self.Password.SetMaxLength( hgrfd ) 
		bSizer3.Add( self.Password, 0, wx.ALL, 5 )
		
		self.password = wx.TextCtrl( self, wx.ID_ANY, wx.EmptyString, wx.DefaultPosition, wx.DefaultSize, wx.TE_PASSWORD )
		bSizer3.Add( self.password, 0, wx.ALL, 5 )
		
		self.button = wx.Button( self, wx.ID_ANY, u"OK", wx.DefaultPosition, wx.DefaultSize, 0 )
		bSizer3.Add( self.button, 0, wx.ALL|wx.ALIGN_RIGHT, 5 )
		
		self.returninfo = wx.TextCtrl( self, wx.ID_ANY, u"返回信息！", wx.DefaultPosition, wx.DefaultSize, 0 )
		bSizer3.Add( self.returninfo, 1, wx.ALL|wx.ALIGN_RIGHT|wx.EXPAND, 5 )
		
		self.m_hyperlink1 = wx.HyperlinkCtrl( self, wx.ID_ANY, u"若登录失败，请点我", u"http://gate.cugbteam.org", wx.DefaultPosition, wx.DefaultSize, wx.HL_DEFAULT_STYLE )
		
		self.m_hyperlink1.SetHoverColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_HIGHLIGHT ) )
		self.m_hyperlink1.SetNormalColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_INACTIVECAPTION ) )
		self.m_hyperlink1.SetVisitedColour( wx.SystemSettings.GetColour( wx.SYS_COLOUR_APPWORKSPACE ) )
		bSizer3.Add( self.m_hyperlink1, 0, wx.ALL, 5 )
		
		
		self.SetSizer( bSizer3 )
		self.Layout()
		
		self.Centre( wx.BOTH )
		
		# Connect Events
		self.button.Bind( wx.EVT_BUTTON, self.login )
	
	def __del__( self ):
		pass
	
	
	# Virtual event handlers, overide them in your derived class
	def login( self, event ):
		event.Skip()
	




class SrunFrame(srun_gui) :
	#constructor
    def __init__(self,parent):
        #initialize parent class
        srun_gui.__init__(self,parent)

    #what to when 'OK' is clicked
    #wx calls this function with and 'event' object
    def login(self,event):
		#evaluate the string in 'account' and "password" ,print the returninfo in box
        
		ans = eval(self.account.GetValue())
        
		account = str(ans)
		
		ans = eval(self.password.GetValue())
        
		password = str(ans)
		
		headers = {
						'User-Agent':'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:43.0) Gecko/20100101 Firefox/43.0',
						"Connection":"keep-alive",
						"Accept-Language" :'zh-CN,zh;q=0.8,en-US;q=0.5,en;q=0.3',
						"Accept-Encoding" : "gzip, deflate",
						"Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
						"Content-Type":'application/x-www-form-urlencoded'
		} 
		values = {
						'username' : account,
						'password' : password,
						'drop':'0',
						'type':'1',
						'is_pad' : '1',
						'n':'99'
					}
		url = "http://202.204.105.195:3333/cgi-bin/do_login"
		data = urllib.urlencode(values)
		request = urllib2.Request(url,data,headers)
		response = urllib2.urlopen(request)

		#clear the box firstly
		
		self.returninfo.SetValue(str(''))
		html = response.read()
		resp = html.decode('utf-8')
		str1 = "登录成功".decode("utf-8")
		if str1 in resp :
			self.returninfo.SetValue("Congratulations to you! Login successful!")
		else :
			self.returninfo.SetValue("I'am so sorry,please click the hyperlink")		
#mandatory in wx, create an app, False stands for not deteriction stdin/stdout
#refer manual for details
if __name__ == "__main__" :
	app = wx.App(False)
 
#create an object of CalcFrame
	frame = SrunFrame(None)
#show the frame
	frame.Show(True)
#start the applications
	app.MainLoop()

