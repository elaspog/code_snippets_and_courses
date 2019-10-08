(
    start "task1" cmd /C ^^^""D:\Program Files\Alteryx\bin\AlteryxEngineCmd.exe" "<WizardValues> <Module>D:\Hungaria\New Developments\CALCULATIONS\LEAD_INCENTIVE\CALC_LEAD_INCENTIVE.yxwz</Module> <Value name='Drop Down (3)'>2019-07</Value> </WizardValues>" > "outp1.txt"^^^"
    start "task2" cmd /C ^^^""D:\Program Files\Alteryx\bin\AlteryxEngineCmd.exe" "<WizardValues> <Module>D:\Hungaria\New Developments\CALCULATIONS\OMV\CALC_OMV.yxwz</Module> <Value name='Drop Down (15)'>2019-07</Value> </WizardValues>" > "outp2.txt"^^^"
) | pause
