from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def home(request):
    #print("Hello world")
    #return HttpResponse("<h1>Hello world</h1>")
    return render(request,'index.html',{'name':'Friends'})

def add(request):
    val1 = int(request.GET['num1'])
    val2 = int(request.GET['num2'])
    res = val1 + val2
    return render(request,'result.html',{'result':res})
