import $ from 'jquery';

class Colors {
    static configureLightAndDarkThemes(){
        // Initial start-up theme, based on user preference
        Colors.updateColorThemes();

        $(document).on("click", ".toggle-color-theme", function(){
            console.log(window.colorTheme);
            if (window.colorTheme == "dark") {
              window.colorTheme = "light";
            } else if (window.colorTheme == "light") {
              window.colorTheme = "dark";
            }

            Colors.updateColorThemes();
        });


    }

    static updateColorThemes(){
        switch(window.colorTheme){
            case "dark":
              this.switchToDarkTheme();
              break;
            case "light":
              this.switchToLightTheme();
              break;
            default:
              break;
        }
    }

    static switchToLightTheme(){
        $(".navbar").css({
          "background-color":"var(--light-navbar-bg)",
          "border-bottom":"var(--light-navbar-border)"
        });
        $(".navbar-text").css({"color":"var(--light-navbar-text)"});
        $(".navbar a:hover").css({"background-color":"var(--light-navbar-hover)"});

        $(".sidebar").css({
            "background-color":"var(--light-sidebar-bg)",
            "border": "1px solid var(--light-sidebar-border)"
        });
        $(".sidebar div > div").css({"color":"var(--light-sidebar-text)"});

        $("ul.dropdown-select li").css({
            "color":"var(--light-dropdown-text)",
            "border":"1px solid var(--light-dropdown-border)",
            "background-color":"var(--light-dropdown-bg)"
        });

        $(".panel-container").css({"background-color":"var(--light-container-bg)"});

// NOT CONFIGURED DOWN FROM HERE
        $(".panel-term").css({
            "background-color":"var(--light-semester-bg)",
            "border":"1px solid var(--dark-semester-border)",
        });
        $(".panel-term-header").css({"color":"var(--dark-semester-header-text"});

        $(".course").css({
            "background-color":"var(--light-course-bg)",
            "border": "1px solid var(--dark-course-border)",
            "color":"var(--light-course-text)"
        });
        $(".ui-state-highlight").css({"background-color":"var(--dark-course-placeholder-bg)"});

        $(".modal-content").css({
            "background-color":"var(--dark-modal-bg)",
            "border":"1px solid var(--dark-modal-border)",
            "color":"var(--dark-modal-text)"
        });
        $(".modal-table-nested").css({
            "background-color":"var(--dark-modal-table)",
            "border":"1px solid var(--dark-modal-border)"
        });

        $(".modal-text-footer a").css({"color":"var(--dark-link-text)"});


    }

    static switchToDarkTheme(){
        $(".navbar").css({
          "background-color":"var(--dark-navbar-bg)",
          "border-bottom":"none"
        });
        $(".navbar-text").css({"color":"var(--dark-navbar-text)"});
        $(".navbar a:hover").css({"background-color":"var(--dark-navbar-hover)"});

        $(".sidebar").css({
          "background-color":"var(--dark-sidebar-bg)",
          "border":"none"
        });
        $(".sidebar div > div").css({"color":"var(--dark-sidebar-text)"});

        $("ul.dropdown-select li").css({
            "color":"var(--dark-dropdown-text)",
            "border":"1px solid var(--dark-dropdown-border)",
            "background-color":"var(--dark-dropdown-bg)"
        });

        $(".panel-container").css({"background-color":"var(--dark-container-bg)"});

        $(".panel-term").css({
            "background-color":"var(--dark-semester-bg)",
            "border":"1px solid var(--dark-semester-border)",
        });
        $(".panel-term-header").css({"color":"var(--dark-semester-header-text"});

        $(".course").css({
            "background-color":"var(--dark-course-bg)",
            "border": "1px solid var(--dark-course-border)",
            "color":"var(--dark-course-text)"
        });
        $(".ui-state-highlight").css({"background-color":"var(--dark-course-placeholder-bg)"});

        $(".modal-content").css({
            "background-color":"var(--dark-modal-bg)",
            "border":"1px solid var(--dark-modal-border)",
            "color":"var(--dark-modal-text)"
        });
        $(".modal-table-nested").css({
            "background-color":"var(--dark-modal-table)",
            "border":"1px solid var(--dark-modal-border)"
        });

        $(".modal-text-footer a").css({"color":"var(--dark-link-text)"});
    }
}

export default Colors;
