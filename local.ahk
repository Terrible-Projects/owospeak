#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

Convert() {
tmp = %ClipboardAll%
Clipboard := ""
Send, ^a
Sleep, 100
Send, ^c
ClipWait, 0, 1
selection = %Clipboard%
Clipboard = %tmp%
Send % RunWaitOne(selection)
Send, {Enter}
}

RunWaitOne(message) {
	whr := ComObjCreate("WinHttp.WinHttpRequest.5.1")
	whr.Open("POST", "http://127.0.0.1:53621/" . UrlEncode(message), true)
	whr.Send()
	whr.WaitForResponse()
	return whr.ResponseText
}
UrlEncode( String )
{
	OldFormat := A_FormatInteger
	SetFormat, Integer, H

	Loop, Parse, String
	{
		if A_LoopField is alnum
		{
			Out .= A_LoopField
			continue
		}
		Hex := SubStr( Asc( A_LoopField ), 3 )
		Out .= "%" . ( StrLen( Hex ) = 1 ? "0" . Hex : Hex )
	}

	SetFormat, Integer, %OldFormat%

	return Out
}
$Enter::
Convert()
return