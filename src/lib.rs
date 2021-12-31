mod utils;

extern crate serde;

use wasm_bindgen::prelude::*;
use serde::{Serialize, Deserialize};
use regex::Regex;
use rand::Rng;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[derive(Serialize, Deserialize)]
pub struct Options {
    pub stutter: Option<bool>,
    pub tilde: Option<bool>,
}

#[wasm_bindgen]
pub fn convert(input: &str, options: &JsValue) -> String {
    utils::set_panic_hook();
    
    let opts: Options;
    if options != &JsValue::undefined() {
        opts = options.into_serde().unwrap();
    } else {
        opts = Options {
            stutter: None,
            tilde: None,
        };
    }

    let url_regex = Regex::new(r"https?://(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&//=]*)").unwrap();

    let input_array = input.split_whitespace();
    let input_array_url_removed = input_array.clone().filter(|x| !url_regex.is_match(x));
    
    if !Regex::new(r"[a-zA-Z]").unwrap().is_match(&input_array_url_removed.clone().collect::<Vec<&str>>().join(" ")) {
        return input.to_string();
    }
    
    let mut input_no_url = input_array_url_removed.clone().collect::<Vec<&str>>().join(" ");
    
    // Put Filters Here
    
    
    
    // End Filters
    
    if opts.stutter.is_none() || opts.stutter.unwrap() {
        let edited_array = input_no_url.split_whitespace().map(|x| {
            let mut edited_word = x.to_string();
            if edited_word.len() > 2 && rand::thread_rng().gen_range(0..6) == 0 {
                let mut char_insert = edited_word.chars().nth(0).unwrap().to_string();
                if edited_word.chars().nth(1).unwrap().to_string() == "h" {
                    char_insert.push_str("h");
                }
                char_insert.push_str("-");
                edited_word = char_insert.to_owned() + &edited_word;
            }
            edited_word
        }).collect::<Vec<String>>();
        input_no_url = edited_array.join(" ");
    }

    let mut edited;
    if input_array.clone().collect::<String>().len() != input_array_url_removed.collect::<String>().len() {
        let mut edited_array = input_no_url.split_whitespace();
        edited = input_array.map(|x| {
            let mut current_word = x.to_string();
            if !url_regex.is_match(x) {
                current_word = edited_array.next().unwrap().to_string();
            }
            current_word
        }).collect::<Vec<String>>().join(" ");
    } else {
        edited = input_no_url
    }

    if opts.tilde.is_none() || opts.tilde.unwrap() {
        edited += "~";
    }

    if rand::random() {
        edited += " ";
        edited += &face();
    }

    return edited;
}

struct Face {
    left: Option<String>,
    right: Option<String>,
    face: Option<String>,
    tilde: bool,
    blush: bool,
    stripe: bool,
}

pub fn face() -> String {
    let faces = [
        Face{left: Some(">".to_string()), right: Some("<".to_string()), face: None, tilde: true, blush: true, stripe: true},
        Face{left: None, right: None, face: Some(">".to_string()), tilde: true, blush: true, stripe: true},
        Face{left: None, right: None, face: Some("<".to_string()), tilde: true, blush: true, stripe: true},
        Face{left: None, right: None, face: Some("^".to_string()), tilde: false, blush: false, stripe: true},
        Face{left: None, right: None, face: Some("-".to_string()), tilde: false, blush: true, stripe: false},
        Face{left: None, right: None, face: Some("~".to_string()), tilde: false, blush: true, stripe: false},
        Face{left: None, right: None, face: Some(".".to_string()), tilde: false, blush: false, stripe: true},
        Face{left: None, right: None, face: Some(",".to_string()), tilde: false, blush: false, stripe: true},
        Face{left: None, right: None, face: Some(";".to_string()), tilde: true, blush: false, stripe: true},
        Face{left: None, right: None, face: Some("T".to_string()), tilde: true, blush: false, stripe: false},
        Face{left: None, right: None, face: Some("Y".to_string()), tilde: true, blush: false, stripe: false},
        Face{left: None, right: None, face: Some("O".to_string()), tilde: false, blush: true, stripe: true},
        Face{left: None, right: None, face: Some("U".to_string()), tilde: false, blush: true, stripe: true},
    ];

    let face = faces.iter().nth(rand::thread_rng().gen_range(0..faces.len())).unwrap();

    let mut connector = "w";
    let mut blush = "";
    let mut end = "";

    if face.stripe && face.tilde && rand::thread_rng().gen_range(0..6) == 0 {
        if rand::random() {
            connector = "-";
        } else {
            connector = "~";
        }
    } else if face.stripe || face.tilde && rand::thread_rng().gen_range(0..6) == 0 {
        if face.stripe {
            connector = "-";
        } else {
            connector = "~";
        }
    }

    if face.blush && rand::thread_rng().gen_range(0..6) == 0 {
        blush = "//";
    }

    if rand::thread_rng().gen_range(0..6) == 0 {
        end = "\"";
    }

    let left;
    let right;
    if face.left.is_some() && face.right.is_some() {
        left = &face.left;
        right = &face.right;
    } else if face.face.is_some() {
        left = &face.face;
        right = &face.face;
    } else {
        return "".to_string();
    }

    let mut result = left.as_deref().unwrap().to_owned();
    result.push_str(blush);
    result.push_str(connector);
    result.push_str(blush);
    result.push_str(right.as_deref().unwrap());
    result.push_str(end);

    return result;
}