### [LINK DO PASSO A PASSO](https://i12bretro.github.io/tutorials/0295.html) PARA O PASSO A PASSO

### [LINK DO VIDEO](https://www.youtube.com/watch?v=KTd1ihW6qAk) PARA O PASSO A PASSO


<div id="gridContainer">
          <div class="topMargin"></div>
          <div id="listName" class="topMargin">
            <h1>Convert VirtualBox VM to ProxMox VE</h1>
          </div>
          <div></div>
          <div id="content">
          <ol>
	<li><input type="checkbox" class="completeBox" id="cb_li_672900_0" rel="li_672900_0" data-pi="0"><span id="li_672900_0"><label for="cb_li_672900_0">On the VirtualBox host, launch VirtualBox</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_799209_1" rel="li_799209_1" data-pi="0"><span id="li_799209_1"><label for="cb_li_799209_1">Right click the VM to convert &gt; Settings</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_337268_2" rel="li_337268_2" data-pi="0"><span id="li_337268_2"><label for="cb_li_337268_2">Select Storage from the left navigation</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_86317_3" rel="li_86317_3" data-pi="0"><span id="li_86317_3"><label for="cb_li_86317_3">Click the virtual hard disk and copy the Location value for the full path of the disk to the clipboard</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_14557_4" rel="li_14557_4" data-pi="0"><span id="li_14557_4"><label for="cb_li_14557_4">Right click on the Start menu &gt; Run &gt; type cmd.exe &gt; Press Enter</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_305392_5" rel="li_305392_5" data-pi="0"><span id="li_305392_5"><label for="cb_li_305392_5">Enter the following commands in the command prompt
	</label></span><span id="li_305392_5"><label for="cb_li_305392_5"><div class="codeBlock">
# change directory to VirtualBox installation<br><input type="image" src="images/clipboard.png" value="" class="copy-text" data-step-index="0" rel="copy_0_1"><span id="copy_0_1">	cd %programfiles%\Oracle\VirtualBox<br></span>	# convert the .vdi to raw .img<br><input type="image" src="images/clipboard.png" value="" class="copy-text" data-step-index="1" rel="copy_0_3"><span id="copy_0_3">	VBoxManage clonehd --format RAW "pasted\full\path\to.vdi" "pasted\full\path\to.raw"</span></div></label></span><span id="li_305392_5"><label for="cb_li_305392_5">
	</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_720804_6" rel="li_720804_6" data-pi="0"><span id="li_720804_6"><label for="cb_li_720804_6">Once the .vdi to .raw conversion completes, open a web browser and navigate to the ProxMox web UI https://ProxMoxDNSorIP:8006/</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_488991_7" rel="li_488991_7" data-pi="0"><span id="li_488991_7"><label for="cb_li_488991_7">Click the Create VM button at the top right</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_746369_8" rel="li_746369_8" data-pi="0"><span id="li_746369_8"><label for="cb_li_746369_8">On the General tab, enter a VM Name and note the VM ID generated &gt; click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_975493_9" rel="li_975493_9" data-pi="0"><span id="li_975493_9"><label for="cb_li_975493_9">On the OS tab select Do not use any media and set the Guest OS &gt; click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_742410_10" rel="li_742410_10" data-pi="0"><span id="li_742410_10"><label for="cb_li_742410_10">On the System tab click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_380626_11" rel="li_380626_11" data-pi="0"><span id="li_380626_11"><label for="cb_li_380626_11">On the Hard Disk tab set the Disk size to 0.001 &gt; click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_74916_12" rel="li_74916_12" data-pi="0"><span id="li_74916_12"><label for="cb_li_74916_12">On the CPU tab set the number of CPUs &gt; click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_352463_13" rel="li_352463_13" data-pi="0"><span id="li_352463_13"><label for="cb_li_352463_13">On the Memory tab set the amount of memory to allocate in MiB &gt; click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_24508_14" rel="li_24508_14" data-pi="0"><span id="li_24508_14"><label for="cb_li_24508_14">On the Network tab click Next</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_988293_15" rel="li_988293_15" data-pi="0"><span id="li_988293_15"><label for="cb_li_988293_15">On the Confirm tab review the settings and click Finish</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_467166_16" rel="li_467166_16" data-pi="0"><span id="li_467166_16"><label for="cb_li_467166_16">Select the newly created VM from the left navigation panel &gt; Hardware</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_705628_17" rel="li_705628_17" data-pi="0"><span id="li_705628_17"><label for="cb_li_705628_17">Click the Hard Disk to select it</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_101057_18" rel="li_101057_18" data-pi="0"><span id="li_101057_18"><label for="cb_li_101057_18">Click the Detach button to detach the hard disk from the VM</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_244603_19" rel="li_244603_19" data-pi="0"><span id="li_244603_19"><label for="cb_li_244603_19">Click the Unused disk</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_737430_20" rel="li_737430_20" data-pi="0"><span id="li_737430_20"><label for="cb_li_737430_20">Click the Remove button to permanently delete it</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_138073_21" rel="li_138073_21" data-pi="0"><span id="li_138073_21"><label for="cb_li_138073_21"><label for="cb_li_27606_33">Download WinSCP </label></label></span><span id="li_138073_21"><label for="cb_li_138073_21"><label for="cb_li_27606_33"><a href="https://winscp.net/eng/downloads.php" target="_blank">Download</a></label></label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_541403_22" rel="li_541403_22" data-pi="0"><span id="li_541403_22"><label for="cb_li_541403_22"><label for="cb_li_178035_34">Extract WinSCP and run the executable</label></label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_288009_23" rel="li_288009_23" data-pi="0"><span id="li_288009_23"><label for="cb_li_288009_23"><label for="cb_li_764421_35">Connect to the ProxMox IP server via WinSCP</label></label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_649593_24" rel="li_649593_24" data-pi="0"><span id="li_649593_24"><label for="cb_li_649593_24"><label for="cb_li_542634_36">Copy the VirtualBox created .raw file to a location on the ProxMox server that has enough free disk space, /root for example</label></label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_215667_25" rel="li_215667_25" data-pi="0"><span id="li_215667_25"><label for="cb_li_215667_25">Back in the browser, open the ProxMox host Shell</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_617333_26" rel="li_617333_26" data-pi="0"><span id="li_617333_26"><label for="cb_li_617333_26">Run the following command to import the raw disk, modify the .raw file name and VM ID noted earlier
	</label></span><span id="li_617333_26"><label for="cb_li_617333_26"><div class="codeBlock"># import the raw disk<br>	# usage:<br>	# qm importdisk &lt;VM ID&gt; /root/&lt;source disk file&gt;.raw &lt;destination storage pool name&gt;<br><input type="image" src="images/clipboard.png" value="" class="copy-text" data-step-index="2" rel="copy_1_3"><span id="copy_1_3">	qm importdisk 100 vbox.raw HDD_500GB --format qcow2</span></div></label></span><span id="li_617333_26"><label for="cb_li_617333_26">
	</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_277197_27" rel="li_277197_27" data-pi="0"><span id="li_277197_27"><label for="cb_li_277197_27">Once the disk import completes, select the target VM from the left navigation menu &gt; Hardware</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_631515_28" rel="li_631515_28" data-pi="0"><span id="li_631515_28"><label for="cb_li_631515_28">Double click the Unused Disk &gt; Click the Add button</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_49302_29" rel="li_49302_29" data-pi="0"><span id="li_49302_29"><label for="cb_li_49302_29">Select Options from the left navigation sub-menu</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_344360_30" rel="li_344360_30" data-pi="0"><span id="li_344360_30"><label for="cb_li_344360_30">Double click Boot Order</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_90445_31" rel="li_90445_31" data-pi="0"><span id="li_90445_31"><label for="cb_li_90445_31">Check the Enabled box next to the hard disk</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_246281_32" rel="li_246281_32" data-pi="0"><span id="li_246281_32"><label for="cb_li_246281_32">Drag the Hard disk up in the boot order as needed, typically below the CD-ROM device</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_808096_33" rel="li_808096_33" data-pi="0"><span id="li_808096_33"><label for="cb_li_808096_33">Click OK</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_906426_34" rel="li_906426_34" data-pi="0"><span id="li_906426_34"><label for="cb_li_906426_34">Click the Start button in the top right of the screen</label></span></li>
	<li><input type="checkbox" class="completeBox" id="cb_li_466526_35" rel="li_466526_35" data-pi="0"><span id="li_466526_35"><label for="cb_li_466526_35">Click the Console link to watch the boot process</label></span></li>
</ol>
