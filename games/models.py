from django.db import models

class Game(models.Model):
    title = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    players = models.CharField(max_length=50)
    play_time = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title