var views = {
    login: loginModel,
    question: questionModel,
    question: questionsModel
};

var viewModel = {
    authenticated: ko.observable(false),
    username: ko.observable(),
    displayName: ko.observable(),
    currentView: ko.observable('login')
};

viewModel.currentViewModel = ko.dependentObservable(function(){
    return views[viewModel.currentView()];
});

viewModel.currentViewModel.subscribe(function() {
    if(viewModel.currentViewModel() && viewModel.currentViewModel().init)
        viewModel.currentViewModel().init();
});

$(function(){

    var options = {
        templateUrl: 'templates'
    };

    ko.ExternaljQueryTemplateEngine.prototype = new ko.templateEngine();
    // Giving you an easy handle to set member values like templateUrl, templatePrefix and templateSuffix.
    ko.externaljQueryTemplateEngine = new ko.ExternaljQueryTemplateEngine(options);
    ko.externaljQueryTemplateEngine.templateUrl = 'templates';
    // overrides the default template engine KO normally wires up.
    ko.setTemplateEngine(ko.externaljQueryTemplateEngine);


    
    ko.applyBindings(viewModel.currentViewModel);
});
