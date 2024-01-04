+++
var1 = [1, 2,
  3, 4]
var2 = "Hello goodbye"
+++

~~~
~~~

\newcommand{\projectdiv}[1]{
~~~
<link rel="stylesheet" href="./styles.css">
<div class="projectdiv">
<h2><a href="./!#1" target=_blank>
{{fill title projects/!#1/index.md}}
</a></h2>
<div class="para-image">
    <p>
    {{fill desc projects/!#1/index.md}}
    </p>
    <img src="!#1/{{fill thumbimage projects/!#1/index.md}}" />
</div>
</div>
~~~
}

\projectdiv{lenia-cancer}
\projectdiv{network-evolution}
\projectdiv{cell-migration}
\projectdiv{reaction-diffusion}
\projectdiv{vicsek-model}
\projectdiv{nagel-schreckenberg}