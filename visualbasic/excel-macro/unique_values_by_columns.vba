Sub Macro1()

Dim i As Integer
Dim testRange As Range
Dim ws As Worksheet
Set ws = ActiveWorkbook.Sheets("uniqe_vals")

For i = 1 To 75
    
    ws.Range(ws.Cells(2, i), ws.Cells(2103, i)).RemoveDuplicates Columns:=1, Header:=xlNo
    MsgBox (i)
    
Next i
 
End Sub 
