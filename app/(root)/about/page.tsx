import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/shared/header";
import Link from "next/link";
import { ArrowLeft, Sparkles, Heart, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/50 to-background">
      <Header favoriteLength={0} />

      <main className="pt-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-8 animate-in fade-in slide-in-from-left-4 duration-500 sm:hidden">
          <Link href="/">
            <Button
              variant="ghost"
              className="group hover:bg-purple-50 dark:hover:bg-purple-950/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Hero Section */}
        <section className="mb-16 animate-in fade-in slide-in-from-top-8 duration-1000">
          <Card className="relative overflow-hidden rounded-3xl border-none shadow-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-purple-800 dark:from-purple-800 dark:via-pink-800 dark:to-purple-900">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-32 translate-y-32" />
            </div>

            <CardContent className="relative z-10 py-16 px-6 sm:px-12 text-center text-white">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  Bukhara Suzani
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 mt-2">
                    Ancient Art of Embroidery
                  </span>
                </h1>
                <p className="text-xl sm:text-2xl leading-relaxed opacity-95 max-w-3xl mx-auto">
                  Discover the timeless beauty and rich cultural heritage of
                  Bukhara"s most treasured craft
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* History Section */}
          <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mr-4">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Rich History
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Bukhara Suzani represents one of the most sophisticated forms
                  of Central Asian textile art, with roots stretching back over
                  1,000 years. The word Suzani derives from the Persian suzan,
                  meaning needle, reflecting the intricate needlework that
                  defines this craft.
                </p>
                <p>
                  Historically, these magnificent textiles were created as part
                  of a bride"s dowry, with mothers and daughters working
                  together for years to complete elaborate pieces that would
                  adorn the new household and serve as symbols of prosperity and
                  protection.
                </p>
                <p>
                  The city of Bukhara, once a major stop on the Silk Road,
                  became renowned for producing the finest Suzani textiles,
                  characterized by their bold floral motifs, vibrant colors, and
                  exceptional craftsmanship.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Craftsmanship Section */}
          <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
            <CardContent className="p-8 sm:p-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mr-4">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Master Craftsmanship
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Each Bukhara Suzani is a masterpiece of hand embroidery,
                  created using silk threads on cotton or silk foundations. The
                  traditional chain stitch technique, passed down through
                  generations, creates the distinctive raised texture that makes
                  these textiles so remarkable.
                </p>
                <p>
                  Master artisans spend months, sometimes years, completing a
                  single large Suzani. The process begins with sketching
                  intricate patterns featuring pomegranates, roses, tulips, and
                  celestial motifs, each carrying deep symbolic meaning.
                </p>
                <p>
                  The vibrant colors - deep reds, brilliant blues, golden
                  yellows, and rich greens - are achieved using both natural and
                  carefully selected synthetic dyes, ensuring the textiles
                  maintain their beauty for generations.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cultural Significance */}
        <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
          <CardContent className="p-8 sm:p-12">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Cultural Significance
              </h2>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
                Beyond their aesthetic beauty, Bukhara Suzani textiles carry
                profound cultural and spiritual meaning
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Symbolic Motifs",
                  description:
                    "Pomegranates symbolize fertility and abundance, roses represent beauty and love, while celestial patterns offer protection and divine blessing.",
                },
                {
                  title: "Family Traditions",
                  description:
                    "Creating Suzani was a communal activity that strengthened family bonds, with techniques and patterns passed from mother to daughter across generations.",
                },
                {
                  title: "Spiritual Protection",
                  description:
                    "Many believe Suzani textiles possess protective qualities, bringing good fortune, health, and prosperity to households that display them.",
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modern Relevance */}
        <Card className="rounded-3xl border border-border/50 shadow-xl bg-gradient-to-br from-card to-card/80 mb-16 animate-in fade-in slide-in-from-top-8 duration-1000 delay-900">
          <CardContent className="p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Preserving Heritage for Tomorrow
            </h2>
            <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-4xl mx-auto">
              Today, Bukhara Suzani continues to captivate collectors and
              interior designers worldwide. By supporting authentic Suzani
              artisans, we help preserve this ancient craft while providing
              sustainable livelihoods for traditional craftspeople in
              Uzbekistan.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Each piece in our collection represents not just exquisite
              artistry, but a living connection to centuries of cultural
              heritage, making every Suzani a treasured heirloom for future
              generations.
            </p>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-1100">
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Our Collection
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
