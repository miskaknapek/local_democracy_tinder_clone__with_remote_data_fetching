# local_democracy_tinder_clone


### Quick intro to running the things 
Basically it all runs in the browser, so you only need to have an ftp server that can serve up files, no browser-based scripting support is needed. 
You can also test things straight from your browser, without an ftp server. Just open a browser and ask the browser to look at the index.html file. 


### Live example  
You'll find a live example here : 
http://sourisr.kapsi.fi/freiburg_remote_meta_data/

<br>


### Modifying texts 
If you want to modify the texts, and add questions-answers, then you'll need to do two things : TL:DR version : change the url of the path the meta-data file, and update the meta-data file with the content you want. 
Longer explanation : 

- In the index.html file, change the url to the meta-data file. 
The following variable holds the URL to the meta-data file : **remote_meta_data_url**

- In the meta-data file, which you'll make yourself, you can define all the texts and question-answer screens you want. Read more below.

An example of such a meta-data text file is here ( yes, you can host it on github, but make sure you link to the raw file, rather than the preview ) : 

https://raw.githubusercontent.com/miskaknapek/test_metadata_for_wahltinder/master/test_meta_data_file.txt

<br>

#### Modifying the meta-data file

The meta-data file needs to be : 
- needs to be a plain textfile, with unix style line endings. 
- hosted online, and the url to the file needs to be in the index.html file, defined by the **remote_meta_data_url** url. 

An example meta-data file looks like this : 
https://raw.githubusercontent.com/miskaknapek/test_metadata_for_wahltinder/master/test_meta_data_file.txt


The syntax for the file content :
Each line with info you want to add to the Election Tinder, needs to start with one of the squre bracket terms shown below. Following the bracket you'll have the item you want to define. ( Please note that if you want to add a new line in a text you're adding, please add a html break tag where you want the newline, rather than a 'normal' line break.) .

<br>

#### Defining static conent, in the meta-data file : 

**[page_title]** the html's page name; as one sees in the page tab.

**[header_text]** The text at the top of the html page.

**[header_sub_text]** The text right under the above .

**[texts__initial_instructional_text]** This is the black text seen right under the picture, when opening the Election Tinder for the first tiem. Typically the text would be an instruction of how to operate the Election Tinder.

<br>

#### Defining the question-answer screens, in the meta-data file: 
KINDLY NOTE: each of these four items NEEDS to be in place, for every question-answer screen you wish to include. Otherwise it won't work :( . So these four items per screen. 

**[introtext]** The question text. 

**[jatext]** The text one sees when swiping or pressing yes.

**[neintext]** The text seen when swiping or pressing no.

**[imageurl]** the url to the image 



### Credits 
Concept : Magnus Eriksson at RISE Interactive <br>
CSS styling : Martin Törnros at RISE Interactive <br>
Code and some design : Miska Knapek  
 